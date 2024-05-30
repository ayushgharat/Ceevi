import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { DashboardHomePage } from "~components/website/dashboard-homepage"
import { Main } from "~components/website/main"

import { createClient } from "~utils/supabase/component"

interface users {
  profile?: JSON | undefined | null
}

const Dashboard = () => {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
    console.log("User has signed out")
    router.push("/login")
  }

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      }

      getUserProfile(user)

      console.log(user)
    }
    checkUser()
  }, [])

  async function getUserProfile(user: User) {
    try {
      const response = await fetch("http://localhost:1947/api/db/get-user", {
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
        setUser(data.data[0])
        //router.push('/dashboard')
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <DashboardHomePage user={user} signOut={signOut}/>
    </div>
  )
}

export default Dashboard
