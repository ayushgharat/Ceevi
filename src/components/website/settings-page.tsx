"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { PuffLoader } from "react-spinners"

import { createClient } from "~utils/supabase/component"

import CustomSidebar from "./sidebar"
import React from "react"

const SettingsComponent = () => {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const signOut = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
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
        <div className="bg-white h-full relative w-full rounded-3xl p-4">
          <button
            onClick={signOut}
            className="rounded-xl border-[1px] border-black hover:bg-vivid_violet hover:text-white hover:border-0 p-3 disabled:bg-red-600"
            disabled={isLoading}>
            {isLoading ? <PuffLoader /> : <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsComponent
