"use server"

import type { User } from "@supabase/supabase-js"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { checkIfUserIsLoggedIn, getUserProfile } from "~app/action"
import { DashboardHomePage } from "~components/website/dashboard-homepage"

import { createClient } from "~utils/supabase/server"

const Dashboard = async () => {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/authenticate/login')
  }
  
  const headersList = headers()


  //const { profile } = await getUserProfile(user?.id)
  
  //if(!user?.user_metadata.profile_created) redirect("/dashboard/profile/edit-profile")

  // async function getUserProfile(user: User) {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/db/get-user`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ user })
  //     })

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     } else {
  //       const data = await response.json()
  //       return data.data[0]
  //       //router.push('/dashboard')
  //     }
  //   } catch (error) {
  //     console.error("Error creating user:", error)
  //   }
  // }

  return (
    <div className="flex flex-col items-center h-screen">
      <DashboardHomePage currentUser={data?.user}/>
    </div>
  )
}

export default Dashboard
