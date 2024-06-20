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

  const handleDateChange = (formattedDate: string, index: number, type: keyof ProfessionalData, name: string) => {
    if (type === 'experience' || type === 'project') {
      const updatedData = [
        ...(professionalData[type] as ExperienceItem[] | ProjectItem[]),
      ];
      updatedData[index] = {
        ...(updatedData[index] as ExperienceItem | ProjectItem),
        [name]: formattedDate,
      };
      setProfessionalData({
        ...professionalData,
        [type]: updatedData,
      });
    }
  };

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
    // Handle form submission logic here
    //console.log(professionalData);
    handleFormSubmit(professionalData)
  }

  return (
    <>
      <Text className="text-3xl">Experiences</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.experience.map((experience, index) => (
          <Stack key={index} spacing={2}>
            <Input
              placeholder="Company"
              name="company"
              value={experience.company}
              onChange={(e) => handleChange(e, index, "experience")}
            />
            <Input
              placeholder="Role"
              name="role"
              value={experience.role}
              onChange={(e) => handleChange(e, index, "experience")}></Input>
            <Input
              placeholder="Location"
              name="location"
              value={experience.location}
              onChange={(e) => handleChange(e, index, "experience")}
            />
            <DateInput
              placeholder="Start Date"
              name="start_date"
              value={experience.start_date!}
              onChange={(formattedDate) => handleDateChange(formattedDate, index, 'experience', 'start_date')}
            />
            <DateInput
              placeholder="End Date"
              name="end_date"
              value={experience.end_date!}
              onChange={(formattedDate) => handleDateChange(formattedDate, index, 'experience', 'start_date')}
            />
            <Textarea
              placeholder="Description"
              resize={"none"}
              name="description"
              value={experience.description}
              onChange={(e) => handleChange(e, index, "experience")}
            />
            <Button onClick={handleRemoveExperience(index)} variant="ghost">
              Remove
            </Button>
          </Stack>
        ))}
        <Button onClick={handleAddExperience}>Add Experience</Button>
      </Stack>
      <Text className="text-3xl mt-4">Projects</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.project.map((project, index) => (
          <Stack key={index} spacing={2}>
            <Input
              placeholder="Name"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(e, index, "project")}
            />
            <Input
              placeholder="Role"
              name="role"
              value={project.skills}
              onChange={(e) => handleChange(e, index, "project")}></Input>
            <Input
              placeholder="Start Date"
              name="start_date"
              type="month"
              value={project.start_date}
              onChange={(e) => handleChange(e, index, "project")}
            />
            <Input
              placeholder="End Date"
              name="end_date"
              type="month"
              value={project.end_date}
              onChange={(e) => handleChange(e, index, "project")}
            />
            <Textarea
              placeholder="Description"
              resize={"none"}
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e, index, "project")}
            />
            <Button onClick={handleRemoveProject(index)} variant="ghost">
              Remove
            </Button>
          </Stack>
        ))}
        <Button onClick={handleAddProject}>Add Project</Button>
      </Stack>

      <>
        <Text className="text-3xl mt-4">Technical Skills</Text>
        <Input
          placeholder="Skills"
          name="skill"
          value={professionalData.skill}
          onChange={(e) => handleChange(e, 0, "skill")}
        />
      </>

      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  )
}

export default ProfessionalInformation
