import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import GeneratePDF from "~components/extension/generatepdf"
import HomePage from "~components/extension/homepage"
import JobInfo from "~components/extension/jobinfo"
import VerifyExperiences from "~components/extension/verifyexperiences"
import VerifyProjects from "~components/extension/verifyprojects"
import VerifySkills from "~components/extension/verifyskills"

interface Resume {
  contact: {}
  education: {}
  experiences: {}
  projects: {}
  skills: {}
}

function IndexOptions() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const [resume, setResume] = useState()
  const [currentView, setCurrentView] = useState<
    | "HomePage"
    | "JobInfo"
    | "VerifyProject"
    | "VerifyExperiences"
    | "VerifySkills"
    | "GeneratePDF"
  >("HomePage")

  const domain = "http://localhost:1947/api"

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
    //console.log(resume)
    setCurrentView("GeneratePDF")
  }

  const generateResumeDetails = async () => {
    setIsLoading(true)

    const fetch_experience = fetch(domain + "/generate/experience", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())

    const fetch_project = fetch(domain + "/generate/project", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())

    const fetch_skill = fetch(domain + "/generate/skill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())

    try {
      Promise.all([fetch_experience, fetch_project, fetch_skill]).then(
        ([response_experience, response_project, response_skill]) => {
          const combined = {
            ...response_experience,
            ...response_project,
            skill: {
              ...response_skill
            }
          }

          setResume(combined)
          setCurrentView("VerifyExperiences")
          setIsLoading(false)
        }
      )
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
            <a href="http://localhost:1947/authenticate/login">
              Log into website
            </a>
          </div>
        )
      ) : currentView === "JobInfo" ? (
        <JobInfo generateResumeDetails={generateResumeDetails} />
      ) : currentView === "VerifyExperiences" ? (
        <VerifyExperiences
          onNext={navigateToVerifyProject}
          finalData={resume}
          setFinalData={setResume}
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
