import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Header from "~components/website/header"
import type { EducationItem, PersonalData, ProfessionalData } from "~types"
import { createClient } from "~utils/supabase/component"

import EditProfilePage from "./edit-profile"

interface Profile {
  personal: PersonalData
  education: EducationItem[]
  professional: ProfessionalData
}

const Profile = () => {
  const supabase = createClient()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>()
  //const [userdata, setUserdata] = useState<any>()

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      //setUserdata(user.user_metadata)

      try {
        const response = await fetch("/api/db/get-user-profile", {
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
          setProfile(data.profile.profile)
          console.log(profile)
          //router.push('/dashboard')
        }
      } catch (error) {
        console.error("Error creating user:", error)
      }
    }

    loadProfile()
  }, [])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
    console.log("User has signed out")
    router.replace("/authenticate/login")
  }

  return (
    <div>
      <Header />

      <div className="p-10 flex flex-col">
        <span className="text-3xl font-semibold">Contact Information</span>
        {profile && (
          <>
            <input value={profile.personal.name} className="mt-4"></input>
            <input value={profile.personal.email} className="mt-2"></input>
            <input
              value={profile.personal.phoneNumber}
              className="mt-2"></input>
          </>
        )}

        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Profile
