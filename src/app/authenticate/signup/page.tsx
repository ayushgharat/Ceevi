import type { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { createClient } from "~/utils/supabase/component"
import { checkIfUserIsLoggedIn } from "~app/action"
import SignInForm from "~components/website/ui/signinform"

export default async function LoginPage() {
  
  const { user, error } = await checkIfUserIsLoggedIn()
  //console.log(isUserLoggedIn)
  if (user) redirect("/dashboard")
  if(error) console.log(error)


  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <SignInForm />
    </main>
  )
}
