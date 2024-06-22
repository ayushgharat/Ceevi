'use server'
import type { User } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { DashboardHomePage } from "~components/website/dashboard-homepage"
import Header from "~components/website/header"
import { createClient } from "~utils/supabase/server"

interface users {
  profile?: JSON | undefined | null
}

const Dashboard = async () => {
  
  const supabase = await createClient()
  const {data, error} = await supabase.auth.getUser()
  if(error || !data?.user) {
    redirect('/authenticate/login')
  }

  async function getUserProfile(user: User) {
    try {
      const response = await fetch(`${process.env.DOMAIN}api/db/get-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        const data = await response.json()
        return data.data[0]
        //router.push('/dashboard')
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <DashboardHomePage user={getUserProfile(data.user)}/>
    </div>
  )
}

export default Dashboard