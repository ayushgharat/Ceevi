import { Button, Input, Select, Stack } from "@chakra-ui/react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import type { EducationItem } from "~types"



const EducationInformation = ({ profileInfo, setActiveStep, handleEducationalInfo }) => {
  if (!setActiveStep || !handleEducationalInfo) {
    console.error("EducationInformation: Missing required props.")
    return null
  }

  const [educationData, setEducationData] = useState<EducationItem[]>((profileInfo && profileInfo.education) ?? [{
    degree_level: "Bachelors"
  }])
  const [errors, setErrors] = useState<{ [key: string]: string }[]>([])

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
    setEducationData([...educationData, {} as EducationItem])
    setErrors([...errors, {}])
  }

  const handleRemoveEducation = (index: number) => () => {
    const updatedEducationData = [...educationData]
    const updatedErrors = [...errors]
    updatedEducationData.splice(index, 1)
    updatedErrors.splice(index, 1)
    setEducationData(updatedEducationData)
    setErrors(updatedErrors)
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string }[] = []
    const requiredFields: (keyof EducationItem)[] = [
      "name",
      "degree_level",
      "major",
      "location",
      "gpa",
      "start_date",
      "end_date"
    ]

    educationData.forEach((education, index) => {
      const educationErrors: { [key: string]: string } = {}
      requiredFields.forEach((field) => {
        if (!education[field]) {
          educationErrors[field] = `${field.replace("_", " ")} is required`
        }
      })
      newErrors[index] = educationErrors
    })

    setErrors(newErrors)

    return newErrors.every(error => Object.keys(error).length === 0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateInputs()) {
      handleEducationalInfo(educationData)
      console.log("Submitted data:", educationData)
      setActiveStep(3)
    } 
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
                value={education.name || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
              {errors[index]?.name && <span className="text-red-500">{errors[index].name}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Degree Level</label>
              <select
                name="degree_level"
                className="DialogInput p-2"
                value={education.degree_level ?? "Bachelors"}
                onChange={handleChange(index)}>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
              {errors[index]?.degree_level && <span className="text-red-500">{errors[index].degree_level}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Major</label>
              <input
                name="major"
                value={education.major || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
              {errors[index]?.major && <span className="text-red-500">{errors[index].major}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Location</label>
              <input
                name="location"
                value={education.location || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
              {errors[index]?.location && <span className="text-red-500">{errors[index].location}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>GPA</label>
              <input
                name="gpa"
                value={education.gpa || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
              {errors[index]?.gpa && <span className="text-red-500">{errors[index].gpa}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                type="month"
                value={education.start_date || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
              />
              {errors[index]?.start_date && <span className="text-red-500">{errors[index].start_date}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={education.end_date || ""}
                onChange={handleChange(index)}
                className="DialogInput p-2"
                type="month"
              />
              {errors[index]?.end_date && <span className="text-red-500">{errors[index].end_date}</span>}
            </div>

            <button
              type="button"
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
