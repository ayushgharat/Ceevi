"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import router, { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { SecureStorage } from "@plasmohq/storage/secure"

import { createClient } from "~/utils/supabase/component"

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

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function logIn() {
    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
    }
    console.log(user)

    router.push("/dashboard")
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:1947/api/auth/callback`
      }
    })
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col items-center justify-center w-1/2">
        <span className="text-3xl font-semibold mb-10">Welcome to Ceevi</span>
        <label htmlFor="email" className="w-full text-left">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2"
        />
        <label htmlFor="password" className="mt-4 w-full text-left">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2"
        />
        {/* <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
        <button
          type="button"
          className="mt-6 w-full rounded-lg p-2 bg-purple-600 text-white font-medium"
          onClick={logIn}>
          Log in
        </button>

        <span className="mt-10">
          Don't have an account yet?{" "}
          <Link href="/authenticate/signup" className="text-purple-600">
            sign up
          </Link>
        </span>

        <div className="h-[1px] bg-slate-500 w-full opacity-30 mt-4"></div>

        <button className="mt-4 bg-white border-2 rounded-3xl border-opacity-20 px-4 py-2 w-full" onClick={signInWithGoogle}>Sign in with Google</button>
      </form>
    </main>
  )
}
