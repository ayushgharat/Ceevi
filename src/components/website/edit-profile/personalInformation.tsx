import { Button, Input, Stack } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react"

import type { PersonalData } from "~types"


const PersonalInformation = ({ profileInfo, setActiveStep, handlePersonalInfo }) => {
  if (!setActiveStep || !handlePersonalInfo) {
    console.error("PersonalInformation: Missing required props.")
    return null
  }

  const [personalData, setPersonalData] = useState<PersonalData>((profileInfo && profileInfo.personal) ?? {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    linkedin: "",
    github: "",
    portfolio: ""
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPersonalData({ ...personalData, [name]: value })
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "linkedin"
    ]

    requiredFields.forEach((field) => {
      if (!personalData[field as keyof PersonalData]) {
        newErrors[field] = `${field.replace("_", " ")} is required`
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateInputs()) {
      handlePersonalInfo(personalData)
      console.log("Submitted data:", personalData)
      setActiveStep(2)
    }
  }

  return (
    <form className="grid grid-cols-2 gap-x-5 gap-y-5">
      <div className="flex flex-col gap-y-2">
        <label>First Name</label>
        <input
          name="first_name"
          value={personalData.first_name}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
      </div>

      <div className="flex flex-col gap-y-2">
        <label>Last Name</label>
        <input
          name="last_name"
          value={personalData.last_name}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Email</label>
        <input
          name="email"
          value={personalData.email}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-y-2">
        <label>Phone Number</label>
        <input
          name="phone_number"
          value={personalData.phone_number}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.phone_number && <span className="text-red-500">{errors.phone_number}</span>}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>LinkedIn URL</label>
        <input
          name="linkedin"
          value={personalData.linkedin}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.linkedin && <span className="text-red-500">{errors.linkedin}</span>}
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Github URL</label>
        <input
          name="github"
          value={personalData.github}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.github && <span className="text-red-500">{errors.github}</span>}
      </div>

      <div className="flex flex-col gap-y-2">
        <label>Portfolio URL</label>
        <input
          name="github"
          value={personalData.portfolio}
          onChange={handleChange}
          className="DialogInput p-2"
        />
        {errors.portfolio && <span className="text-red-500">{errors.github}</span>}
      </div>
      <button
        type="button"
        className="col-span-2 PrimaryButton mt-10"
        onClick={handleSubmit}>
        Next
      </button>
    </form>
  )
}

export default PersonalInformation
