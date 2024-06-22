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

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        setErrorMessage("User is already logged in.")
        router.push("/dashboard")
      }
    }

    checkUser()
  }, [router, supabase])

  async function addUserToDatabase(user: User) {
    try {
      const response = await fetch("/api/db/new-user", {
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

  async function signUp() {
    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: `${firstName} ${lastName}`,
        }
      }
    })

    if (error) {
      if (error.message === "User already registered") {
        setErrorMessage("User already registered. Please log in.")
      } else {
        console.error(error)
        setErrorMessage(error.message)
      }
    } else {
      if (user) addUserToDatabase(user)
    }
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.DOMAIN}api/auth/callback`
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
          className="w-full py-2 px-3 mt-8 rounded-[30px] border-[1px] border-electric_indigo"
        />

        <input
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-3 mt-8 rounded-[30px] border-[1px] border-electric_indigo"
        />

        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 mt-8 mb-12 rounded-[30px] border-[1px] border-electric_indigo"
        />

        <button type="button" className="PrimaryButton" onClick={signUp}>
          Sign up
        </button>

        {errorMessage && (
          <span className="text-red-500 mt-4">{errorMessage}</span>
        )}

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
