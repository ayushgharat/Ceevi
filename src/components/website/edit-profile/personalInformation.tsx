import { Button, Input, Stack } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react"

import type { PersonalData } from "~types"

const PersonalInformation = ({ profileInfo, setActiveStep, handlePersonalInfo }) => {
  const [personalData, setPersonalData] = useState<PersonalData>(profileInfo.personal ?? {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    linkedin: "",
    github: ""
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPersonalData({ ...personalData, [name]: value })
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    handlePersonalInfo(personalData)
    console.log("Submitted data:", personalData)
    setActiveStep(2)
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
      </div>

      <div className="flex flex-col gap-y-2">
        <label>Last Name</label>
        <input
          name="last_name"
          value={personalData.last_name}
          onChange={handleChange}
          className="DialogInput p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Email</label>
        <input
          name="email"
          value={personalData.email}
          onChange={handleChange}
          className="DialogInput p-2"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label>Phone Number</label>
        <input
          name="phone_number"
          value={personalData.phone_number}
          onChange={handleChange}
          className="DialogInput p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label>LinkedIn URL</label>
        <input
          name="linkedin"
          value={personalData.linkedin}
          onChange={handleChange}
          className="DialogInput p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label>Github URL</label>
        <input
          name="github"
          value={personalData.github}
          onChange={handleChange}
          className="DialogInput p-2"
        />
      </div>
      <button
        type="submit"
        className="col-span-2 PrimaryButton mt-10"
        onClick={handleSubmit}>
        Next
      </button>
    </form>
  )
}

export default PersonalInformation
