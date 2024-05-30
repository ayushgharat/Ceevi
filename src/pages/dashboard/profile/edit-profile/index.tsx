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
import { useState } from "react"
import PersonalInformation from "~components/website/edit-profile/personalInformation"
import type { FormUserInfo, PersonalData } from "~types"

const EditProfilePage = () => {
  const steps = [
    { title: "First", description: "Personal Information" },
    { title: "Second", description: "Education Information" },
    { title: "Third", description: "Professional Experience" }
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  })

  const [profileInfo, setProfileInfo] = useState<FormUserInfo>();

  const handlePersonalInfo = (personalInfo: PersonalData) => {
    setProfileInfo((prev) => ({
      ...prev!,
      personal: personalInfo,
    }));
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
        {/* {activeStep === 1 && (
          <EducationInformation
            setActiveStep={setActiveStep}
            handleEducationalInfo={handleEducationalInfo}
          />
        )}
        {activeStep === 2 && (
          <ProfessionalExperience
            handleFormSubmit={handleFormSubmit}
            handleProfessionalInfo={handleProfessionalInfo}
          />
        )} */}
      </div>
    </div>
  )
}

export default EditProfilePage
