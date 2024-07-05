import { Button, Input, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import type { ExperienceItem, ProfessionalData, ProjectItem } from "~types";

import DateInput from "../ui/dateinput";


const ProfessionalInformation = ({
  profileInfo,
  handleFormSubmit,
  handleProfessionalInfo,
}) => {
  if (!profileInfo || !handleFormSubmit || !handleProfessionalInfo) {
    console.error("ProfessionalInformation: Missing required props.");
    return null;
  }

  const [professionalData, setProfessionalData] = useState<ProfessionalData>(
    profileInfo.professional ?? {
      experience: [],
      project: []
    }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }[]>([]);
  const [loading, setLoading] = useState(false);

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
    setErrors([...errors, {}]);
  };

  const handleRemoveExperience = (index: number) => () => {
    const updatedExperience = [...professionalData.experience];
    updatedExperience.splice(index, 1);
    setProfessionalData({
      ...professionalData,
      experience: updatedExperience
    });
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleAddProject = () => {
    setProfessionalData({
      ...professionalData,
      project: [...professionalData.project, {} as ProjectItem]
    });
    setErrors([...errors, {}]);
  };

  const handleRemoveProject = (index: number) => () => {
    const updatedProjects = [...professionalData.project];
    updatedProjects.splice(index, 1);
    setProfessionalData({
      ...professionalData,
      project: updatedProjects
    });
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string }[] = [];
    const requiredExperienceFields: (keyof ExperienceItem)[] = [
      "company",
      "role",
      "location",
      "start_date",
      "end_date",
      "description"
    ];

    const requiredProjectFields: (keyof ProjectItem)[] = [
      "name",
      "skills",
      "start_date",
      "end_date",
      "description"
    ];

    professionalData.experience.forEach((experience, index) => {
      const experienceErrors: { [key: string]: string } = {};
      requiredExperienceFields.forEach((field) => {
        if (!experience[field]) {
          experienceErrors[field] = `${field.replace("_", " ")} is required`;
        }
      });
      newErrors[index] = experienceErrors;
    });

    professionalData.project.forEach((project, index) => {
      const projectErrors: { [key: string]: string } = {};
      requiredProjectFields.forEach((field) => {
        if (!project[field]) {
          projectErrors[field] = `${field.replace("_", " ")} is required`;
        }
      });
      newErrors[professionalData.experience.length + index] = projectErrors;
    });

    setErrors(newErrors);

    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      setLoading(true);
      handleFormSubmit(professionalData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
                value={experience.company || ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
              {errors[index]?.company && <span className="text-red-500">{errors[index].company}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Role</label>
              <input
                name="role"
                value={experience.role || ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
              {errors[index]?.role && <span className="text-red-500">{errors[index].role}</span>}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Location</label>
              <input
                name="location"
                value={experience.location || ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
              {errors[index]?.location && <span className="text-red-500">{errors[index].location}</span>}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                value={experience.start_date || ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
                type="month"
              />
              {errors[index]?.start_date && <span className="text-red-500">{errors[index].start_date}</span>}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={experience.end_date !== "Present" ? experience.end_date || "" : ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
                type="month"
                disabled={experience.end_date === "Present"}
              />
              {errors[index]?.end_date && <span className="text-red-500">{errors[index].end_date}</span>}
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
                value={experience.description || ""}
                onChange={(e) => handleChange(e, index, "experience")}
                className="DialogInput p-2"
              />
              {errors[index]?.description && <span className="text-red-500">{errors[index].description}</span>}
            </div>
            <button type="button" onClick={handleRemoveExperience(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>Add Experience</button>
      </Stack>
      <Text className="text-3xl mt-4">Projects</Text>
      <Stack className="mt-4" spacing={4}>
        {professionalData?.project.map((project, index) => (
          <div key={index} className="grid grid-cols-2 gap-5 shadow-lg p-3 rounded-xl">
            <div className="flex flex-col gap-y-2">
              <label>Name</label>
              <input
                name="name"
                value={project.name || ""}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
              {errors[professionalData.experience.length + index]?.name && <span className="text-red-500">{errors[professionalData.experience.length + index].name}</span>}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Skills</label>
              <input
                name="skills"
                value={project.skills || ""}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
              {errors[professionalData.experience.length + index]?.skills && <span className="text-red-500">{errors[professionalData.experience.length + index].skills}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label>Start Date</label>
              <input
                name="start_date"
                value={project.start_date || ""}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
                type="month"
              />
              {errors[professionalData.experience.length + index]?.start_date && <span className="text-red-500">{errors[professionalData.experience.length + index].start_date}</span>}
            </div>
            <div className="flex flex-col gap-y-2">
              <label>End Date</label>
              <input
                name="end_date"
                value={project.end_date || ""}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
                type="month"
              />
              {errors[professionalData.experience.length + index]?.end_date && <span className="text-red-500">{errors[professionalData.experience.length + index].end_date}</span>}
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
                value={project.description || ""}
                onChange={(e) => handleChange(e, index, "project")}
                className="DialogInput p-2"
              />
              {errors[professionalData.experience.length + index]?.description && <span className="text-red-500">{errors[professionalData.experience.length + index].description}</span>}
            </div>
            <button type="button" onClick={handleRemoveProject(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>Add Project</button>
      </Stack>

      <button
        className="PrimaryButton mt-10 disabled:bg-slate-500"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default ProfessionalInformation;
