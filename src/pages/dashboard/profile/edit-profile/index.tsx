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
import { useEffect, useState } from "react"
import EducationInformation from "~components/website/edit-profile/educationInformation"
import PersonalInformation from "~components/website/edit-profile/personalInformation"
import ProfessionalInformation from "~components/website/edit-profile/professionalExperience"
import type { EducationItem, FormUserInfo, PersonalData, ProfessionalData } from "~types"
import { useRouter } from "next/router"

const EditProfilePage = () => {
  const steps = [
    { title: "First", description: "Personal Information" },
    { title: "Second", description: "Education Information" },
    { title: "Third", description: "Professional Experience" }
  ]

  const router = useRouter()

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  })

  const [id, setId] = useState(null)

  useEffect(() => {
    setId(router.query.id)
  }, [])

  const [profileInfo, setProfileInfo] = useState<FormUserInfo>();

  const handlePersonalInfo = (personalInfo: PersonalData) => {
    setProfileInfo((prev) => ({
      ...prev!,
      personal: personalInfo,
    }));
  };

  const handleEducationalInfo = (educationInfo: EducationItem) => {
    setProfileInfo((prev) => ({
      ...prev!,
      education: educationInfo,
    }));
  };

  const handleProfessionalInfo = (professionalInfo: ProfessionalData) => {
    setProfileInfo((prev) => ({
      ...prev!,
      professional: professionalInfo,
    }));
  };

  const handleFormSubmit = (professionalInfo: ProfessionalData) => {
    setProfileInfo((prev) => {
      const updatedUserInfo = {
        ...prev!,
        professional: professionalInfo,
      };
      //console.log("Final User Info", updatedUserInfo);

      const postObject = {
        profile: updatedUserInfo,
        id: id
      };

      console.log(postObject)

      //Perform fetch POST request after updating userInfo
      fetch("/api/db/update-profile", {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response data if needed
          console.log("Response from POST request:", data);
          if(data.message) {
            router.back()
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      return updatedUserInfo;
    });
  };



  return (
    <div className="m-10">
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
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
          <PersonalInformation
            setActiveStep={setActiveStep}
            handlePersonalInfo={handlePersonalInfo}
          />
        )}
        {activeStep === 1 && (
          <EducationInformation
            setActiveStep={setActiveStep}
            handleEducationalInfo={handleEducationalInfo}
          />
        )}
        {activeStep === 2 && (
          <ProfessionalInformation
            handleFormSubmit={handleFormSubmit}
            handleProfessionalInfo={handleProfessionalInfo}
          />
        )}
      </div>
    </div>
  )
}

export default EditProfilePage
