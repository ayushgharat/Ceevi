import type { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { createClient } from "~/utils/supabase/server"
import { checkIfUserIsLoggedIn } from "~app/action"
import SignInForm from "~components/website/ui/signinform"

export default async function LoginPage() {
  
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/dashboard')
  }
  if(error) console.log(error)


  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <SignInForm />
    </main>
  )
}
