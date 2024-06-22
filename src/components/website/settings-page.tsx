"use client"

import { useRouter } from "next/navigation"

import { createClient } from "~utils/supabase/component"

import CustomSidebar from "./sidebar"

const SettingsComponent = () => {
  const router = useRouter()
  const supabase = createClient()

  const signOut = () => {
    supabase.auth.signOut()
    // if (error) {
    //   console.error(error)
    // }
    console.log("User has signed out")
    router.push("/authenticate/login")
  }
  return (
    <div id="header" className="flex flex-row w-full h-full">
      {/* {menu} */}
      <CustomSidebar />

      <div className="bg-gradient-to-br from-vivid_violet to-electric_indigo w-full flex flex-col p-2 h-full">
        <span className="ms-10 my-5 w-fit font-poppins font-semibold text-2xl text-white">
          Settings
        </span>
        <div className="bg-white h-full relative w-full rounded-3xl">
            <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsComponent
