"use client"

import Image from "next/image"
import React from "react"

import { signInWithGoogle } from "~app/action"
import { createClient } from "~utils/supabase/component"

const GoogleLogIn = () => {
  const supabase = createClient()

  //TODO: Figure out how to handle redirect domain for signInWithGoogle

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/auth/callback`
      }
    })
  }
  return (
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
  )
}

export default GoogleLogIn
