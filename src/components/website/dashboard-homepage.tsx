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

import { checkIfUserIsLoggedIn } from "~app/action"
import { testingResume } from "~types"
import { createClient } from "~utils/supabase/component"

import BuildResume from "./dashboard/buildResume"
import Main from "./dashboard/main"
import SubmitPDF from "./dashboard/submitpdf"
import VerifyInformation from "./dashboard/verifyInformation"
import CustomSidebar from "./sidebar"

export function DashboardHomePage({ currentUser }) {
  const router = useRouter()
  const supabase = createClient()
  const [componentToRender, setComponentToRender] = useState("home")
  const [resume, setResume] = useState(testingResume)
  const [fileBlob, setFileBlob] = useState<Blob | null>(null)

  //const [data, setData] = useState("")
  //const router = useRouter();

  function completeProfile() {
    //console.log(user.id)
    //router.push("/dashboard/profile/edit-profile?id=" + user.id)
  }

  const buildResume = () => {
    setComponentToRender("buildResume")
  }

  const navigateToHome = () => {
    setComponentToRender("home")
  }

  const generatePDF = () => {
    setComponentToRender("generatingPDF")
    const postData = {
      data: resume
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }

    fetch(process.env.NEXT_PUBLIC_DOMAIN + "api/generate/pdf", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.arrayBuffer()
      })
      .then((buffer) => {
        // `buffer` now contains the PDF content as an ArrayBuffer
        console.log("Received PDF buffer:", buffer)

        // Example usage: create a Blob from the ArrayBuffer
        const pdfBlob = new Blob([buffer], { type: "application/pdf" })

        setFileBlob(pdfBlob)
        setComponentToRender("SubmitPDF")
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        // Handle fetch error here
      })
  }

  const generateResume = async (jobInfo, userPref) => {
    setComponentToRender("generatingResume")
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + "api/db/get-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: currentUser.id })
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const current_profile = await response.json()

      const resume_response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + "api/generate/resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            job_info: jobInfo,
            profile: current_profile,
            userPref: userPref
          })
        }
      )
      if (!resume_response.ok) {
        throw new Error("Failed to fetch data from resume endpoints")
      }

      const generated_resume = await resume_response.json()

      const combined = await {
        personal: current_profile.data[0].profile.personal,
        education: current_profile.data[0].profile.education,
        professional: {
          experience: generated_resume.experience,
          project: generated_resume.project,
          skill: {
            ...generated_resume.skill
          }
        }
      }
      setResume(combined)
      //setResume(testingResume)

      setComponentToRender("verifyInformation")
      //setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const navigateToVerifyInformation = () => {
    setComponentToRender("verifyInformation")
  }

  const renderComponent = () => {
    switch (componentToRender) {
      case "home":
        return <Main buildResume={buildResume} currentUser={currentUser} />
      case "buildResume":
        return (
          <BuildResume
            onBack={navigateToHome}
            generateResume={generateResume}
          />
        )
      case "generatingResume":
        return <span>Generating Resume...</span>
      case "verifyInformation":
        return (
          <VerifyInformation
            resume={resume}
            setResume={setResume}
            navigateToJobInfo={buildResume}
            generatePDF={generatePDF}
          />
        )
      case "generatingPDF":
        return <span>Generating PDF...</span>
      case "SubmitPDF":
        return (
          <SubmitPDF
            navigateToVerifyInformation={navigateToVerifyInformation}
            fileBlob={fileBlob}
          />
        )

      default:
        return <Main buildResume={buildResume} currentUser={currentUser} />
    }
  }

  return (
    <div id="header" className="flex flex-row w-full h-full">
      {/* {menu} */}
      <CustomSidebar />

      <div className="bg-gradient-to-br from-vivid_violet to-electric_indigo w-full flex flex-col p-2 h-full">
        <span className="ms-10 my-5 w-fit font-poppins font-semibold text-2xl text-white">
          Dashboard
        </span>
        {renderComponent()}
      </div>
    </div>
  )
}
