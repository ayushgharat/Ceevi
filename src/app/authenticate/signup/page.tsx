"use client"

import type { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
      if (user) addUserToDatabase(user)
    }
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

        <input
          placeholder="First Name"
          id="name"
          type="name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full py-2 px-3 mt-8 rounded-[30px] border-[1px] border-electric_indigo"
        />

        <input
          placeholder="Last Name"
          id="name"
          type="name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full py-2 px-3 mt-8  rounded-[30px] border-[1px] border-electric_indigo"
        />

        <input
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-3 mt-8  rounded-[30px] border-[1px] border-electric_indigo"
        />

        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 mt-8 mb-12 rounded-[30px] border-[1px] border-electric_indigo"
        />
        {/* <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
        <button type="button" className="PrimaryButton" onClick={signUp}>
          Sign up
        </button>

        <span className="mt-10">
          Already have an account?{" "}
          <Link href="/authenticate/login" className="text-purple-600">
            Log in
          </Link>
        </span>

        <div className="h-[1px] bg-slate-500 w-full opacity-30 mt-4"></div>

        <button
          className="mt-4 bg-white border-2 rounded-3xl border-opacity-20 px-4 py-2 w-full flex flex-row items-center justify-center gap-x-4"
          onClick={signInWithGoogle}>
          <Image
            src="/image/google-logo.png"
            alt="Google logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </form>
    </main>
  )
}
