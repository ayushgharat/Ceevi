"use client"

import type { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PuffLoader } from "react-spinners"
import { signup } from "~app/action"

import { createClient } from "~utils/supabase/component"

const SignInForm = () => {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const response = await signup(email, password, firstName, lastName)
    if (response && response.message) {
      setErrorMessage(response.message)
      setLoading(false)
    }
    
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}api/auth/callback?next=/dashboard/profile/edit-profile`
      }
    })
  }
  return (
    <form className="flex flex-col items-center justify-center w-1/2 font-dmsans">
      <span className="text-4xl mb-12 font-poppins">Welcome to Ceevi</span>

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
        className="w-full py-2 px-3 mt-8 rounded-[30px] border-[1px] border-electric_indigo"
      />

      <div className="w-full flex flex-col justify-center">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="PrimaryButton mt-10 flex flex-col items-center">
          {loading ? (
            <PuffLoader size={30} color="#ffffff" className="h-1 w-1" />
          ) : (
            <span className="text-center">Create my account</span>
          )}
        </button>
        {errorMessage && (
          <span className="text-center w-full pt-5 text-red-600">
            {errorMessage}
          </span>
        )}
      </div>

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
  )
}

export default SignInForm
