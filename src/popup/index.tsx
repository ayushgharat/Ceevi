import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import GeneratePDF from "~components/extension/generatepdf"
import HomePage from "~components/extension/homepage"
import JobInfoComponent from "~components/extension/jobinfo"
import VerifyExperiences from "~components/extension/verifyexperiences"
import VerifyProjects from "~components/extension/verifyprojects"
import VerifySkills from "~components/extension/verifyskills"
import type { ExperienceItem } from "~types"

interface Resume {
  personal: {}
  education: {}
  professional: {
    experience: {}
    project: {}
    skill: {}
  }
}

function IndexOptions() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const [resume, setResume] = useState<Resume>()
  const [currentView, setCurrentView] = useState<
    | "HomePage"
    | "JobInfo"
    | "VerifyProject"
    | "VerifyExperiences"
    | "VerifySkills"
    | "GeneratePDF"
  >("HomePage")

  const domain = "http://localhost:1947/api"
  //const [finalUserInfo, setFinalUserInfo] = useState()

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch(domain + "/auth/get-current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.user) {
          setUser(data.user) // Handle the user data here
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }

      setIsLoading(false)
    }

    checkUser()
  }, [])

  const navigateToJobInfo = () => {
    setCurrentView("JobInfo")
  }

  const navigateToVerifySkills = () => {
    setCurrentView("VerifySkills")
  }

  const navigateToVerifyProject = () => {
    setCurrentView("VerifyProject")
  }

  const generateResumePDF = () => {
    console.log(resume)
    // setFinalUserInfo((prevValue) => {
    //   const newValue = prevValue
    //   if(newValue) newValue.professional = resume
    //   return newValue
    // })
    setCurrentView("GeneratePDF")
  }

  const generateResumeDetails = async (jobInfo) => {
    setIsLoading(true)
    console.log(jobInfo)

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
      }
      const profile = await response.json()

      //console.log(profile.data)
      // setFinalUserInfo({
      //   ...profile.personal
      // })

      const [response_experience, response_project] = await Promise.all([
        //const [response_experience] = await Promise.all([
        fetch(domain + "/generate/experience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ job_info: jobInfo, profile: profile })
        }),
        fetch(domain + "/generate/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ job_info: jobInfo, profile: profile })
        })
      ])

      if (!response_experience.ok || !response_project.ok) {
        throw new Error("Failed to fetch data from one or both endpoints")
      }

      const data_experience = await response_experience.json()
      const data_project = await response_project.json()
      //console.log(data_experience)
      const response_skill = await fetch(domain + "/generate/skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          experience: data_experience,
          project: data_project,
          job_info: jobInfo
        })
      })

      if (!response_skill.ok) {
        throw new Error("Failed to fetch skill data")
      }

      const data_skill = await response_skill.json()
      const combined = await {
        personal: profile.data[0].profile.personal,
        education: profile.data[0].profile.education,
        professional: {
          experience: data_experience.experience,
          project: data_project.project,
          skill: {
            ...data_skill
          }
        }
      }

      setResume(combined)
      console.log(combined)
      setCurrentView("VerifyExperiences")
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : currentView === "HomePage" ? (
        user ? (
          <HomePage user={user} navigateToJobInfo={navigateToJobInfo} />
        ) : (
          <div className="flex flex-col w-[200px] items-center">
            <span>No User Logged in</span>
            <button
              onClick={() => {
                chrome.tabs.create({
                  url: "./tabs/delta-flyer.html"
                })
              }}>
              Log into website
            </button>
          </div>
        )
      ) : currentView === "JobInfo" ? (
        <JobInfoComponent generateResumeDetails={generateResumeDetails} />
      ) : currentView === "VerifyExperiences" ? (
        <VerifyExperiences
          onNext={navigateToVerifyProject}
          finalData={resume}
        />
      ) : currentView === "VerifyProject" ? (
        <VerifyProjects
          onNext={navigateToVerifySkills}
          finalData={resume}
          setFinalData={setResume}
        />
      ) : currentView === "VerifySkills" ? (
        <VerifySkills generateResume={generateResumePDF} finalData={resume} />
      ) : currentView === "GeneratePDF" ? (
        <GeneratePDF finalData={resume} />
      ) : (
        <div>Error, reload the extension</div>
      )}

      {/* For the purpose of designing resume  */}
      {/* <GeneratePDF finalData={resume} /> */}
    </div>
  )
}

export default IndexOptions
