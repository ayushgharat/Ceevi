import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import GeneratePDF from "~components/extension/generatepdf"
import GeneratingDetailsLoading from "~components/extension/generating-resume-details"
import HomePage from "~components/extension/homepage"
import JobInfoComponent from "~components/extension/jobinfo"
import Loading from "~components/extension/loading"
import VerifyExperiences from "~components/extension/verifyexperiences"
import VerifyProjects from "~components/extension/verifyprojects"
import VerifySkills from "~components/extension/verifyskills"

const testingResume = {
  professional: 
    {
      project: [
        {
          "name": "CoFiscal",
          "skills": [
            {"value": "Next.js"},
            {"value": "Website Development"}
          ],
          "start_date": "Oct 2023",
          "end_date": "Oct 2023",
          "description": [
            {"value": "Developed CoFiscal, a cutting-edge financial platform powered by AI to empower borrowers with data-driven insights for informed loan decisions."},
            {"value": "Implemented SMOTE to address extreme data skewness and optimized OCR feature for accurate data extraction, achieving 92.03% accuracy on unseen data with LightGBM."},
            {"value": "Designed and developed a fullstack interface with a Next.js web app featuring React, Tailwind CSS, and Flask backend for multiple model calls. Won Capital One best Financial Tool Award at HackGT 10."}
          ]
        },
        {
          "name": "CeeVi: Chrome Extension",
          "skills": [
            {"value": "Next.js"}
          ],
          "start_date": "2023-05",
          "end_date": "2023-08",
          "description": [
            {"value": "Created a Chrome extension that automates resume building."},
            {"value": "Developed a chatbot interface within the extension for enhanced user experience."}
          ]
        },
        {
          "name": "Aashwas",
          "skills": [
            {"value": "Entrepreneurship"},
            {"value": "Advocacy"}
          ],
          "start_date": "2023-05",
          "end_date": "2023-08",
          "description": [
            {"value": "Positively impacted 5,000+ frontline health workers across 80+ cities in India during CoVID-19 lockdown."},      
            {"value": "Organized virtual activities like comedy shows and riddle hunts for healthcare workers to de-stress."},
            {"value": "Raised $10,200 to supply 2,400 PPE Kits and 8,000+ snacks to St. John’s Hospital, Bengaluru. Presented at the United Nations HQ at the Activate Impact Summit."}
          ]
        }
      ]
    },
    experience: [
      {
        company: "OrangeHealth Labs",
        role: "SWE Intern",
        start_date: "2023-05",
        end_date: "2023-08",
        location: "Bengaluru, India",
        description: [
          {
            value:
              "Developed an admin dashboard website using Next.js, React, and MySQL for marketing team empowerment."
          },
          {
            value:
              "Implemented REST API for CRUD operations, utilizing tools like Docker, Prisma, Auth.js."
          },
          {
            value:
              "Utilized SSG, SSA, RadixUI, Amazon ECR to build efficient solutions, saving $20,000/year."
          }
        ]
      },
      {
        company: "Nutrivend",
        role: "Software Developer",
        start_date: "Sep 2022",
        end_date: "Dec 2022",
        location: "Atlanta, GA",
        description: [
          {
            value:
              "Built Tauri App with Rust backend for vending machine interface, focusing on user transactions."
          },
          {
            value:
              "Developed stylized pages and components using Next.js, React, Tailwind for user workflows."
          },
          {
            value:
              "Implemented React and Tailwind for enhancing user experience in purchase workflow."
          }
        ]
      }
    ]
  }


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
    | "LoadingResume"
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
    setCurrentView("LoadingResume")
    //setIsLoading(true)
    //console.log(jobInfo)

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

      setCurrentView("VerifyExperiences")
      //setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return (
    <div className="bg-violet-700 p-1">
      {isLoading ? (
        <Loading />
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
      ) : currentView === "LoadingResume" ? (
        <GeneratingDetailsLoading />
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
      {/* <VerifyProjects finalData={testingResume} onNext={null} setFinalData={null}/> */}
    </div>
  )
}

export default IndexOptions
