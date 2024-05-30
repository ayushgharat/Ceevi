import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { SecureStorage } from "@plasmohq/storage/secure"

import { createClient } from '~/utils/supabase/component'
import type { User } from '@supabase/supabase-js'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  

  useEffect(() => {
    const checkUser = async () => {
      const {data : {user}} = await supabase.auth.getUser()
      if (user) {
        router.push("/dashboard")
      } else {}
      console.log(user)
    }

    checkUser()
  }, [])


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function logIn() {
    const { data : { user }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
    }
    console.log(user)
    
    router.push('/dashboard')
  }

  async function signUp() {

    // TODO: account for situation when account already exists and user tries
    // to sign up

    const { data: { user }, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
    } else {
      addUserToDatabase(user)
    }
    
  }

  return (
    <main>
      <form className='flex flex-col items-center justify-center'>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={logIn}>
          Log in
        </button>
        <button type="button" onClick={signUp}>
          Sign up
        </button>
      </form>
    </main>
  )
}

async function addUserToDatabase(user: User) {
  try {
    const response = await fetch('http://localhost:1947/api/db/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

