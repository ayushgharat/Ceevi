import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { SecureStorage } from "@plasmohq/storage/secure"

import { createClient } from "~/utils/supabase/server"
import GoogleLogIn from "~components/website/googlelogin"
import LoginComponent from "~components/website/login-component"

import {
  checkIfUserIsLoggedIn,
  login,
  signInWithGoogle,
  signup
} from "../../action"
import { LoginForm } from "~components/website/ui/loginform"
import { useFormState } from "react-dom"

export default async function LoginPage() {
  //const supabase = await createClient()

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      {/* <LoginComponent /> */}
      
      <LoginForm/>
      <div className="w-1/2 flex justify-center flex-col">
        <span className="mt-10 text-center">
          Don't have an account yet?{" "}
          <Link href="/authenticate/signup" className="text-purple-600">
            Sign up
          </Link>
        </span>
        <GoogleLogIn />
      </div>
    </main>
  )
}
