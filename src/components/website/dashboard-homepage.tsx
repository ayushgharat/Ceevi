'use client'
import type { User } from "@supabase/supabase-js"
import { useRouter, redirect } from "next/navigation"
import { useState } from "react"
import { createClient } from "~utils/supabase/component"


export function DashboardHomePage({ user }) {
  const router = useRouter()
  const supabase = createClient()
  const [currentUser, setCurrentUser] = useState(user)

  const signOut = () => {

    supabase.auth.signOut()
    // if (error) {
    //   console.error(error)
    // }
    console.log("User has signed out")
    router.push("/authenticate/login")
  }
  
  
  
  //const [data, setData] = useState("")
  //const router = useRouter();

  function completeProfile() {
    redirect('/dashboard/profile/edit-profile?id=' + user.id)
  }
  

  return (
    <div className="flex flex-col items-center">
      <span>Welcome to my dashboard</span>

      {currentUser && !currentUser.profile && <button onClick={completeProfile}>Complete your profile</button>}

      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
