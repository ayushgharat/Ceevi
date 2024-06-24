"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login } from "~app/action"

import { createClient } from "~utils/supabase/component"

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const supabase = createClient()
  const router = useRouter()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.DOMAIN}/api/auth/callback`
      }
    })
  }

  return (
    <form className="flex flex-col items-center justify-center w-1/2 font-dmsans">
      <span className="text-4xl mb-20 font-poppins">Welcome to Ceevi</span>
      {/* <label htmlFor="email" className="w-full text-left">
          Email
        </label> */}
      <input
        id="email"
        type="email"
        value={email}
        required
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
        required
      />
      {/* <button type="submit" className="PrimaryButton" onClick={() => login(email, password)}>
        Log in
      </button> */}

      {errorMessage && (
        <span className="text-red-500 mt-4">{errorMessage}</span>
      )}

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
        <Image
          src="/image/google-logo.png"
          alt="Google logo"
          width={20}
          height={20}
        />
        Sign in with Google
      </button>
    </form>
  )
}

export default LoginComponent
