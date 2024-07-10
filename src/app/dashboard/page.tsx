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
  
  return (
    <div className="flex flex-col items-center h-screen overflow-clip">
      <DashboardHomePage currentUser={data?.user}/>
    </div>
  )
}

export default Dashboard
