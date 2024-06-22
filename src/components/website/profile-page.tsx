"use client"

import { useState } from "react"
import { CircleLoader, PuffLoader } from "react-spinners"

import CustomSidebar from "./sidebar"
import ProfileCardEducation from "./ui/profile-card-education"
import ProfileCardExperience from "./ui/profile-card-experience"
import ProfileCardPersonal from "./ui/profile-card-personal"
import ProfileCardProject from "./ui/profile-card-project"
import EditProfilePage from "~app/dashboard/profile/edit-profile/page"

const ProfileComponent = (props) => {
  const [componentToRender, setComponentToRender] = useState("Personal")
  const [profile, setProfile] = useState(props.profile.profile)
  const [isLoading, setIsLoading] = useState(false)

  const id = props.id

  const updateProfile = async (newProfile) => {
    setIsLoading(true)
    console.log(process.env.DOMAIN)
    try {
      const response = await fetch(`api/db/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id, profile: newProfile })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        const data = await response.json()
        console.log(data)
        console.log("Name updated successfully")
        setProfile({ profile: newProfile })
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error creating user:", error)
    }
    console.log(profile)
  }

  //console.log(profile.value)

  const renderComponent = () => {
    switch (componentToRender) {
      case "Personal":
        return (
          <ProfileCardPersonal
            profile={profile}
            updateProfile={updateProfile}
          />
        )
      case "Education":
        return (
          <ProfileCardEducation
            profile={profile}
            updateProfile={updateProfile}
          />
        )
      case "Experiences":
        return (
          <ProfileCardExperience
            profile={profile}
            updateProfile={updateProfile}
          />
        )
      case "Projects":
        return (
          <ProfileCardProject
            profile={profile}
            updateProfile={updateProfile}
          />
        )
      default:
        return (
          <ProfileCardPersonal
            profile={profile}
            updateProfile={updateProfile}
          />
        )
    }
  }

  return (
    <div id="header" className="flex flex-row w-full h-screen parent">
      {/* {menu} */}
      <CustomSidebar />

      <div className="bg-gradient-to-br from-vivid_violet to-electric_indigo w-full flex flex-col p-2 h-full ">
        <span className="ms-10 my-5 w-fit font-poppins font-semibold text-2xl text-white">
          Edit your profile
        </span>
        <div className="bg-white relative w-full rounded-3xl p-8 flex flex-row h-full max-h-full overflow-scroll">
          {profile ? (
            <>
              <div className="flex flex-col w-1/4 border-r-[1px] h-full ms-5 font-dmsans text-lg font-medium gap-y-5">
                <button
                  className="text-left"
                  onClick={(e) => setComponentToRender("Personal")}>
                  Personal
                </button>
                <button
                  className="text-left"
                  onClick={() => setComponentToRender("Education")}>
                  Education
                </button>
                <button
                  className="text-left"
                  onClick={() => setComponentToRender("Experiences")}>
                  Experiences
                </button>
                <button
                  className="text-left"
                  onClick={() => setComponentToRender("Projects")}>
                  Projects
                </button>
              </div>

              {isLoading ? (
                <div className="flex flex-col w-3/4 items-center justify-center">
                  <PuffLoader />
                </div>
              ) : (
                renderComponent()
              )}
            </>
          ) : (
            <div>First time? Why don't we set up your profile for you?
              <EditProfilePage/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent
