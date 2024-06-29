import { Button, Input, Select, Stack, Text, Textarea } from "@chakra-ui/react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import type { ExperienceItem, ProfessionalData, ProjectItem } from "~types"

import DateInput from "../ui/dateinput"

const ProfessionalInformation = ({
  handleFormSubmit,
  handleProfessionalInfo,
  existingInfo
}: any) => {
  const [professionalData, setProfessionalData] = useState<ProfessionalData>({
    experience: [],
    project: [],
    skill: ""
  })

  const [loading, setLoading] = useState(false)

  if (existingInfo) {
    setProfessionalData(existingInfo)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: keyof ProfessionalData
  ) => {
    const { name, value } = event.target

    if (type === "experience" || type === "project") {
      // Ensure type is narrowed to ExperienceItem[] or ProjectItem[]
      const updatedData = [
        ...(professionalData[type] as ExperienceItem[] | ProjectItem[])
      ]
      updatedData[index] = {
        ...(updatedData[index] as ExperienceItem | ProjectItem), // Type assertion
        [name]: value
      }
      setProfessionalData({
        ...professionalData,
        [type]: updatedData
      })
    } else {
      // Ensure type is narrowed to string
      setProfessionalData({
        ...professionalData,
        [name]: value
      })
    }
  }

  const handleDateChange = (
    formattedDate: string,
    index: number,
    type: keyof ProfessionalData,
    name: string
  ) => {
    if (type === "experience" || type === "project") {
      const updatedData = [
        ...(professionalData[type] as ExperienceItem[] | ProjectItem[])
      ]
      updatedData[index] = {
        ...(updatedData[index] as ExperienceItem | ProjectItem),
        [name]: formattedDate
      }
      setProfessionalData({
        ...professionalData,
        [type]: updatedData
      })
    }
  }

  const handleAddExperience = () => {
    setProfessionalData({
      ...professionalData,
      experience: [...professionalData.experience, {}]
    })
  }

  const handleRemoveExperience = (index: number) => () => {
    const updatedExperience = [...professionalData.experience]
    updatedExperience.splice(index, 1)
    setProfessionalData({
      ...professionalData,
      experience: updatedExperience
    })
  }

  const handleAddProject = () => {
    setProfessionalData({
      ...professionalData,
      project: [...professionalData.project, {}]
    })
  }

  const handleRemoveProject = (index: number) => () => {
    const updatedProjects = [...professionalData.project]
    updatedProjects.splice(index, 1)
    setProfessionalData({
      ...professionalData,
      project: updatedProjects
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    // Handle form submission logic here
    //console.log(professionalData);
    handleFormSubmit(professionalData)
  }

  return (
    <>
      <span className="mt-10">
        Don't be shy, make sure you add as much information about your
        experiences and projects as possible. The more, the better...
      </span>
      <Text className="text-3xl mt-5">Experiences</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.experience.map((experience, index) => (
          <div key={index} className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-y-2">
              <label>Company</label>
              <input
                name="company"
                value={experience.company}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Role</label>
              <input
                name="role"
                value={experience.role}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Location</label>
              <input
                name="location"
                value={experience.location}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                value={experience.start_date}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
                type="month"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={experience.end_date}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
                type="month"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label>Description</label>
              <textarea
                name="description"
                value={experience.description}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
            </div>
            <button onClick={handleRemoveExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddExperience}>Add Experience</button>
      </Stack>
      <Text className="text-3xl mt-4">Projects</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.project.map((project, index) => (
          <div key={index} className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-y-2">
              <label>Name</label>
              <input
                name="name"
                value={project.name}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Skills</label>
              <input
                name="skills"
                value={project.skills}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                value={project.start_date}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
                type="month"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={project.end_date}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
                type="month"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label>Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
            </div>
            <button onClick={handleRemoveProject(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddProject}>Add Project</button>
      </Stack>

      {/* <>
        <Text className="text-3xl mt-4">Technical Skills</Text>
        <Input
          placeholder="Skills"
          name="skill"
          value={professionalData.skill}
          onChange={(e) => handleChange(e, 0, "skill")}
        />
      </> */}

      <button
        className="PrimaryButton mt-10 disabled:bg-slate-500"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}>
        Submit
      </button>
    </>
  )
}

export default ProfessionalInformation
