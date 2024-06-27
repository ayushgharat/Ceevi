"use server"

import type { User } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

import { checkIfUserIsLoggedIn, getUserProfile } from "~app/action"
import { DashboardHomePage } from "~components/website/dashboard-homepage"
import Header from "~components/website/header"
import { createClient } from "~utils/supabase/server"

const Dashboard = async () => {
  const { user, error } = await checkIfUserIsLoggedIn()
  //console.log(isUserLoggedIn)
  if (error) redirect("/authenticate/login")

  const { profile } = await getUserProfile(user?.id)
  console.log(profile[0].profile)

  if (!profile[0].profile) redirect("/dashboard/profile/edit-profile?id=" + user?.id)

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
      {user && <DashboardHomePage user={user} />}
    </div>
  )
}

export default Dashboard
