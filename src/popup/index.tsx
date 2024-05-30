//import { createClient, type Provider, type User } from "@supabase/supabase-js"
import type { User } from "@supabase/supabase-js"
import { supabase } from "core/supabase"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { SecureStorage } from "@plasmohq/storage/secure"
import HomePage from "~components/extension/homepage"

function IndexOptions() {
  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState<User>()

  const domain = "http://localhost:1947/api"

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch(domain + "/auth/getCurrentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if(data.user) {
          setUser(data.user) // Handle the user data here
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }

      setIsLoading(false)
    }

    checkUser()
  }, [])

  const UserComponent = () => {
    if(user) {
      return <HomePage user={user}/>
    }
    return <div>No User Logged in</div>
  }

  return (
    <div>{isLoading ? <div>Logging you in</div> : <UserComponent/>}</div>
  )
}

export default IndexOptions
