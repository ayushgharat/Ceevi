import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Header from "~components/website/header"
import ProfileCardEducation from "~components/website/ui/profile-card-education"
import ProfileCardPersonal from "~components/website/ui/profile-card-personal"
import ProfileCardProfessional from "~components/website/ui/profile-card-professional"
import type { EducationItem, PersonalData, ProfessionalData } from "~types"
import { createClient } from "~utils/supabase/component"

interface Profile {
  personal: PersonalData
  education: EducationItem[]
  professional: ProfessionalData
}

const Profile = () => {
  const supabase = createClient()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>()
  const [userdata, setUserdata] = useState<any>()

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUserdata(user)

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

  const updateProfile = async (newProfile) => {
    try {
      const response = await fetch("/api/db/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userdata.id, profile: newProfile })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        const data = await response.json()
        console.log(data)
        console.log("Name updated successfully")

        setProfile(newProfile)
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const updateEducation = async (newEducation) => {
    try {
      const response = await fetch("/api/db/update-personal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userdata.id, education: newEducation })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        const data = await response.json()
        console.log(data)
        console.log("Name updated successfully")

        setProfile((prevProfile) => ({
          ...prevProfile,
          education: newEducation
        }))
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  return (
    <div>
      <Header />

      <div className="p-10 flex flex-col">
        {profile && (
          <div className="flex flex-col space-y-4">
            <ProfileCardPersonal
              profile={profile}
              updateProfile={updateProfile}
            />
            <ProfileCardEducation
              profile={profile}
              updateProfile={updateProfile}
            />
            <ProfileCardProfessional
              profile={profile}
              updateProfile={updateProfile}
            />
          </div>
        )}

        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Profile
