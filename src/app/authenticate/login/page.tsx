"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import router, { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { SecureStorage } from "@plasmohq/storage/secure"

import { createClient } from "~/utils/supabase/component"
import Image from "next/image"

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
      <form className="flex flex-col items-center justify-center w-1/2 font-dmsans">
        <span className="text-4xl mb-20 font-poppins">Welcome to Ceevi</span>
        {/* <label htmlFor="email" className="w-full text-left">
          Email
        </label> */}
        <input
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="peer w-full py-2 px-3 rounded-[30px] border-[1px] border-electric_indigo focus:border-vivid_violet"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 mt-8 mb-16 rounded-[30px] border-[1px] border-electric_indigo"
          placeholder="password"
        />
        <button type="button" className="PrimaryButton" onClick={logIn}>
          Log in
        </button>

        <span className="mt-10">
          Don't have an account yet?{" "}
          <Link href="/authenticate/signup" className="text-purple-600">
            Sign up
          </Link>
        </span>

        <div className="h-[1px] bg-slate-500 w-full opacity-30 mt-4"></div>

        <button
          className="mt-4 bg-white border-2 rounded-3xl border-opacity-20 px-4 py-2 w-full flex flex-row items-center justify-center gap-x-4"
          onClick={signInWithGoogle}>
            <Image src="/image/google-logo.png" alt="Google logo" width={20} height={20}/>
          Sign in with Google
        </button>
      </form>
    </main>
  )
}
