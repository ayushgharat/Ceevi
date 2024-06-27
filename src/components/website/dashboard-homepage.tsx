"use client"

import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon
} from "@radix-ui/react-icons"
import type { User } from "@supabase/supabase-js"
import { ChevronLeftCircleIcon, ChevronLeftSquareIcon } from "lucide-react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"

import { createClient } from "~utils/supabase/component"
import CustomSidebar from "./sidebar"

export function DashboardHomePage({ user }) {
  const router = useRouter()
  const supabase = createClient()
  const [currentUser, setCurrentUser] = useState(user)

  console.log(currentUser)

  const signOut = () => {
    supabase.auth.signOut()
    // if (error) {
    //   console.error(error)
    // }
    console.log("User has signed out")
    router.push("/authenticate/login")
  }

  //const [data, setData] = useState("")
  //const router = useRouter();

  function completeProfile() {
    //console.log(user.id)
    //router.push("/dashboard/profile/edit-profile?id=" + user.id)
  }

  

  
  return (
    <div id="header" className="flex flex-row w-full h-full">
      {/* {menu} */}
      <CustomSidebar/>

      <div className="bg-gradient-to-br from-vivid_violet to-electric_indigo w-full flex flex-col p-2 h-full">
        <span className="ms-10 my-5 w-fit font-poppins font-semibold text-2xl text-white">
          Dashboard
        </span>
        <div className="bg-white h-full relative w-full rounded-3xl"></div>
      </div>
    </div>
  )
}
