import { Button, Input, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import type { ExperienceItem, ProfessionalData, ProjectItem } from "~types";

import DateInput from "../ui/dateinput";

const ProfessionalInformation = ({
  profileInfo,
  handleFormSubmit,
  handleProfessionalInfo,
  existingInfo
}: any) => {
  const [professionalData, setProfessionalData] = useState<ProfessionalData>(profileInfo.professional);
  const [loading, setLoading] = useState(false);

  if (existingInfo) {
    setProfessionalData(existingInfo);
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: keyof ProfessionalData
  ) => {
    const { name, value } = event.target;

    if (type === "experience" || type === "project") {
      const updatedData = [
        ...(professionalData[type] as ExperienceItem[] | ProjectItem[])
      ];
      updatedData[index] = {
        ...(updatedData[index] as ExperienceItem | ProjectItem),
        [name]: value
      };
      setProfessionalData({
        ...professionalData,
        [type]: updatedData
      });
    } else {
      setProfessionalData({
        ...professionalData,
        [name]: value
      });
    }
  };

  const handleDateChange = (
    formattedDate: string,
    index: number,
    type: keyof ProfessionalData,
    name: string
  ) => {
    if (type === "experience" || type === "project") {
      const updatedData = [
        ...(professionalData[type] as ExperienceItem[] | ProjectItem[])
      ];
      updatedData[index] = {
        ...(updatedData[index] as ExperienceItem | ProjectItem),
        [name]: formattedDate
      };
      setProfessionalData({
        ...professionalData,
        [type]: updatedData
      });
    }
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    type: keyof ProfessionalData
  ) => {
    const updatedData = [
      ...(professionalData[type] as ExperienceItem[] | ProjectItem[])
    ];
    if (event.target.checked) {
      updatedData[index].end_date = "Present";
    } else {
      updatedData[index].end_date = "";
    }
    setProfessionalData({
      ...professionalData,
      [type]: updatedData
    });
  };

  const handleAddExperience = () => {
    setProfessionalData({
      ...professionalData,
      experience: [...professionalData.experience, {} as ExperienceItem]
    });
  };

  const handleRemoveExperience = (index: number) => () => {
    const updatedExperience = [...professionalData.experience];
    updatedExperience.splice(index, 1);
    setProfessionalData({
      ...professionalData,
      experience: updatedExperience
    });
  };

  const handleAddProject = () => {
    setProfessionalData({
      ...professionalData,
      project: [...professionalData.project, {} as ProjectItem]
    });
  };

  const handleRemoveProject = (index: number) => () => {
    const updatedProjects = [...professionalData.project];
    updatedProjects.splice(index, 1);
    setProfessionalData({
      ...professionalData,
      project: updatedProjects
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    handleFormSubmit(professionalData);
  };

  return (
    <>
      <span className="mt-10">
        Don't be shy, make sure you add as much information about your
        experiences and projects as possible. The more, the better...
      </span>
      <Text className="text-3xl mt-5">Experiences</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.experience.map((experience, index) => (
          <div key={index} className="grid grid-cols-2 gap-5 shadow-lg p-3 rounded-xl">
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
                value={experience.end_date !== "Present" ? experience.end_date : ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
                type="month"
                disabled={experience.end_date === "Present"}
              />
              <label>
                <input
                  type="checkbox"
                  className="DialogInput p-2"
                  checked={experience.end_date === "Present"}
                  onChange={(e) => handleCheckboxChange(e, index, "experience")}
                />
                Present
              </label>
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
            <button onClick={handleRemoveExperience(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddExperience}>Add Experience</button>
      </Stack>
      <Text className="text-3xl mt-4">Projects</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.project.map((project, index) => (
          <div key={index} className="grid grid-cols-2 gap-5 shadow-lg p-3 rounded-xl">
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
              <label>
                <input
                  type="checkbox"
                  className="DialogInput p-2"
                  checked={project.end_date === "Present"}
                  onChange={(e) => handleCheckboxChange(e, index, "project")}
                />
                Present
              </label>
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

      <button
        className="PrimaryButton mt-10 disabled:bg-slate-500"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default ProfessionalInformation;
