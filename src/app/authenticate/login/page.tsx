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
import { LoginButton } from "~components/website/ui/loginbutton"

export default async function LoginPage() {
  //const supabase = await createClient()

  const { user, error } = await checkIfUserIsLoggedIn()
  //console.log(isUserLoggedIn)
  if (user) redirect("/dashboard")

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      {/* <LoginComponent /> */}
      <form className="flex flex-col items-start justify-center w-1/2 font-dmsans">
        <span className="text-4xl mb-16 font-poppins">Welcome to Ceevi</span>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="peer w-full py-2 px-3 rounded-[30px] border-[1px] border-electric_indigo focus:border-vivid_violet"
        />
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="peer w-full py-2 px-3 rounded-[30px] border-[1px] border-electric_indigo focus:border-vivid_violet"
        />
        <LoginButton/>
      </form>
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
