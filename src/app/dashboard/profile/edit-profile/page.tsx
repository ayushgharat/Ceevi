"use client"

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps
} from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

import EducationInformation from "~components/website/edit-profile/educationInformation"
import PersonalInformation from "~components/website/edit-profile/personalInformation"
import ProfessionalInformation from "~components/website/edit-profile/professionalExperience"
import { SubmitResume } from "~components/website/edit-profile/submitResume"
import type {
  EducationItem,
  FormUserInfo,
  PersonalData,
  ProfessionalData
} from "~types"

const EditProfilePage = () => {
  const steps = [
    { title: "First", description: "Resume" },
    { title: "Second", description: "Personal Information" },
    { title: "Third", description: "Education Information" },
    { title: "Fourth", description: "Professional Experience" }
  ]

  const router = useRouter()

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  })

  const [id, setId] = useState("")

  const searchParams = useSearchParams()

  useEffect(() => {
    function getID() {
      if (searchParams) {
        const userID = searchParams.get("id")
        if (userID) {
          setId(userID)
        }
      } else {
        console.log("No ID detected")
      }
    }

    getID()
  }, [])

  const [profileInfo, setProfileInfo] = useState<FormUserInfo>()

  const handlePersonalInfo = (personalInfo: PersonalData) => {
    setProfileInfo((prev) => ({
      ...prev!,
      personal: personalInfo
    }))
  }

  const handleEducationalInfo = (educationInfo: EducationItem) => {
    setProfileInfo((prev) => ({
      ...prev!,
      education: educationInfo
    }))
  }

  const handleProfessionalInfo = (professionalInfo: ProfessionalData) => {
    setProfileInfo((prev) => ({
      ...prev!,
      professional: professionalInfo
    }))
  }

  const handleFormSubmit = (professionalInfo: ProfessionalData) => {
    setProfileInfo((prev) => {
      const updatedUserInfo = {
        ...prev!,
        professional: professionalInfo
      }
      //console.log("Final User Info", updatedUserInfo);

      const postObject = {
        profile: updatedUserInfo,
        id: id
      }

      console.log(postObject)

      //Perform fetch POST request after updating userInfo
      fetch("/api/db/update-profile", {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response data if needed
          console.log("Response from POST request:", data)
          if (data.message) {
            router.replace("/profile")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })

      return updatedUserInfo
    })
  }

  return (
    <div className="m-10 p-5 font-dmsans">
      <span className="font-poppins text-3xl">
        Welcome to Ceevi. Let's start by setting up your profile
      </span>
      <Stepper index={activeStep} colorScheme="purple" className="mt-10">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <div className="mt-5">
        {activeStep === 0 && (
          <SubmitResume
            setActiveStep={setActiveStep}
            setResume={setProfileInfo}
            //handlePersonalInfo={handlePersonalInfo}
          />
        )}
        {activeStep === 1 && (
          <PersonalInformation
            profileInfo={profileInfo}
            setActiveStep={setActiveStep}
            handlePersonalInfo={handlePersonalInfo}
          />
        )}
        {activeStep === 2 && (
          <EducationInformation
            profileInfo={profileInfo}
            setActiveStep={setActiveStep}
            handleEducationalInfo={handleEducationalInfo}
          />
        )}
        {activeStep === 3 && (
          <ProfessionalInformation
            profileInfo={profileInfo}
            handleFormSubmit={handleFormSubmit}
            handleProfessionalInfo={handleProfessionalInfo}
            existingInfo={null}
          />
        )}
      </div>
    </div>
  )
}

export default function Parent() {
  return (
    <Suspense>
      <EditProfilePage />
    </Suspense>
  )
}
