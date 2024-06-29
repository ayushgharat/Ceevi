import { Button, Input, Select, Stack } from "@chakra-ui/react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import type { EducationItem } from "~types"

const EducationInformation = ({
  profileInfo,
  setActiveStep,
  handleEducationalInfo
}: any) => {
  const [educationData, setEducationData] = useState<EducationItem[]>(profileInfo.education)
  

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target
      const updatedEducationData = [...educationData]
      updatedEducationData[index] = {
        ...updatedEducationData[index],
        [name]: value
      }
      setEducationData(updatedEducationData)
    }

  const handleAddEducation = () => {
    setEducationData([...educationData, {}])
  }

  const handleRemoveEducation = (index: number) => () => {
    const updatedEducationData = [...educationData]
    updatedEducationData.splice(index, 1)
    setEducationData(updatedEducationData)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    handleEducationalInfo(educationData)
    console.log("Submitted data:", educationData)
    setActiveStep(3)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {educationData.map((education, index) => (
          <div key={index} className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-y-2">
              <label>Name</label>
              <input
                name="name"
                value={education.name}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Degree Level</label>
              <select
                name="degree_level"
                className="DialogInput p-2"
                value={education.degree_level}
                onChange={handleChange(index)}>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Major</label>
              <input
                name="major"
                value={education.major}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Location</label>
              <input
                name="location"
                value={education.location}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>GPA</label>
              <input
                name="gpa"
                value={education.gpa}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                type="month"
                value={education.start_date}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={education.end_date}
                onChange={handleChange(index)}
                className="DialogInput p-2"
                type="month"
              />
            </div>

            <button
              className="col-span-2"
              onClick={handleRemoveEducation(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddEducation}>
          Add Education
        </button>
        <button className="PrimaryButton" type="submit">
          Next
        </button>
      </Stack>
    </form>
  )
}

export default EducationInformation
