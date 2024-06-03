import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "~/utils/supabase/component"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        router.push("/dashboard")
      } else {
      }
      console.log(user)
    }

    checkUser()
  }, [])

  
async function addUserToDatabase(user: User) {
    try {
      const response = await fetch("http://localhost:1947/api/db/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  async function signUp() {
    // TODO: account for situation when account already exists and user tries
    // to sign up

    const {
      data: { user },
      error
    } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
    } else {
        if(user) addUserToDatabase(user)
    }
  }


  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col items-center justify-center w-1/2">
        <span className="text-3xl font-semibold mb-10">Welcome to Ceevi</span>
        <label htmlFor="name" className="w-full text-left">First Name</label>
        <input
          id="name"
          type="name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border-2 border-purple-600 rounded-lg"
        />
        <label htmlFor="name" className="w-full text-left">Last Name</label>
        <input
          id="name"
          type="name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border-2 border-purple-600 rounded-lg"
        />
        <label htmlFor="email" className="mt-4 w-full text-left">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border-2 border-purple-600 rounded-lg"
        />
        <label htmlFor="password" className="mt-4 w-full text-left">Password</label>
        <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border-2 border-purple-600 rounded-lg"/>
        {/* <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
        <button type="button" className="mt-6 w-full rounded-lg p-2 bg-purple-600 text-white font-medium" onClick={signUp}>
          Sign up
        </button>

        <span className="mt-10">Already have an account? <Link href="/authenticate/login" className="text-purple-600">Log in</Link></span>
        
      </form>
    </main>
  )
}

