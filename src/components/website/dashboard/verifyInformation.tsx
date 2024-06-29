import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Document } from "document";
import { useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

const VerifyInformation = ({
  resume,
  setResume,
  navigateToJobInfo,
  generatePDF,
}) => {
  console.log(resume);

  const handleChange = (e, type, index, descIndex = null) => {
    const { name, value } = e.target;
    const updatedResume = { ...resume };

    if (type === "experience") {
      if (descIndex !== null) {
        updatedResume.professional.experience[index].description[descIndex].value = value;
      } else {
        updatedResume.professional.experience[index][name] = value;
      }
    } else if (type === "project") {
      if (descIndex !== null) {
        updatedResume.professional.project[index].description[descIndex].value = value;
      } else {
        updatedResume.professional.project[index][name] = value;
      }
    }

    setResume(updatedResume);
  };

  const handleAddition = (tag, section, index = null) => {
    const updatedResume = { ...resume };
    if (section === "projectSkills" && index !== null) {
      updatedResume.professional.project[index].skills.push({ value: tag.text });
    } else if (section === "languages") {
      updatedResume.professional.skill.languages.push(tag.text);
    } else if (section === "technologies") {
      updatedResume.professional.skill.technologies.push(tag.text);
    }
    setResume(updatedResume);
  };

  const handleDelete = (i, section, index = null) => {
    const updatedResume = { ...resume };
    if (section === "projectSkills" && index !== null) {
      updatedResume.professional.project[index].skills = updatedResume.professional.project[index].skills.filter(
        (skill, idx) => idx !== i
      );
    } else if (section === "languages") {
      updatedResume.professional.skill.languages = updatedResume.professional.skill.languages.filter(
        (skill, idx) => idx !== i
      );
    } else if (section === "technologies") {
      updatedResume.professional.skill.technologies = updatedResume.professional.skill.technologies.filter(
        (skill, idx) => idx !== i
      );
    }
    setResume(updatedResume);
  };

  const handleDrag = (tag, currPos, newPos, section, index = null) => {
    const updatedResume = { ...resume };
    if (section === "projectSkills" && index !== null) {
      const skills = updatedResume.professional.project[index].skills;
      skills.splice(currPos, 1);
      skills.splice(newPos, 0, { value: tag.text });
    } else if (section === "languages") {
      const languages = updatedResume.professional.skill.languages;
      const [movedItem] = languages.splice(currPos, 1);
      languages.splice(newPos, 0, movedItem);
    } else if (section === "technologies") {
      const technologies = updatedResume.professional.skill.technologies;
      const [movedItem] = technologies.splice(currPos, 1);
      technologies.splice(newPos, 0, movedItem);
    }
    setResume(updatedResume);
  };

  const handleDescriptionRemove = (type, index, descIndex) => {
    const updatedResume = { ...resume };
    if (type === "experience") {
      updatedResume.professional.experience[index].description = updatedResume.professional.experience[index].description.filter(
        (_, idx) => idx !== descIndex
      );
    } else if (type === "project") {
      updatedResume.professional.project[index].description = updatedResume.professional.project[index].description.filter(
        (_, idx) => idx !== descIndex
      );
    }
    setResume(updatedResume);
  };

  const handleDescriptionAdd = (type, index) => {
    const updatedResume = { ...resume };
    if (type === "experience") {
      updatedResume.professional.experience[index].description.push({ value: "" });
    } else if (type === "project") {
      updatedResume.professional.project[index].description.push({ value: "" });
    }
    setResume(updatedResume);
  };

  return (
    <div className="bg-white h-full relative w-full rounded-3xl flex flex-col p-10 overflow-scroll">
      <div className="flex flex-row gap-x-3 justify-between">
        <span className="font-poppins text-3xl text-black">Verify The Information</span>
        <button
          className="rounded-2xl border-[1px] border-black p-3 font-dmsans border-opacity-50"
          onClick={navigateToJobInfo}
        >
          Regenerate Resume
        </button>
      </div>

      <div className="grid grid-cols-2 mt-10 font-dmsans justify-between gap-x-5">
        <div className="flex flex-col overflow-x-auto w-full min-w-[250px]">
          <span className="text-2xl">Experiences</span>
          {resume.professional.experience.map((experience, index) => {
            return (
              <div key={index} className="flex flex-col mt-5">
                <input
                  name="company"
                  value={experience.company}
                  onChange={(e) => handleChange(e, "experience", index)}
                />
                <input
                  name="role"
                  value={experience.role}
                  onChange={(e) => handleChange(e, "experience", index)}
                />
                {experience.description.map((item, descIndex) => {
                  return (
                    <div key={descIndex} className="flex flex-row gap-x-3">
                      <input
                        value={item.value}
                        className="min-w-[250px] w-full"
                        onChange={(e) =>
                          handleChange(e, "experience", index, descIndex)
                        }
                      />
                      <button onClick={() => handleDescriptionRemove("experience", index, descIndex)}>
                        <MinusCircledIcon />
                      </button>
                    </div>
                  );
                })}
                <button className="mt-3" onClick={() => handleDescriptionAdd("experience", index)}>
                  <PlusCircledIcon />
                </button>
              </div>
            );
          })}

          <span className="text-2xl mt-10">Projects</span>
          {resume.professional.project.map((project, index) => {
            return (
              <div key={index} className="flex flex-col mt-5">
                <input
                  name="name"
                  value={project.name}
                  onChange={(e) => handleChange(e, "project", index)}
                />
                <ReactTags
                  autoFocus={false}
                  tags={project.skills.map(({ value }) => ({
                    id: value,
                    text: value
                  }))}
                  separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]}
                  handleDelete={(i) => handleDelete(i, "projectSkills", index)}
                  handleAddition={(tag) => handleAddition(tag, "projectSkills", index)}
                  handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, "projectSkills", index)}
                  inputFieldPosition="bottom"
                  placeholder="Add a skill"
                />
                {project.description.map((item, descIndex) => {
                  return (
                    <div key={descIndex} className="flex flex-row gap-x-3">
                      <input
                        value={item.value}
                        className="min-w-[250px] w-full"
                        onChange={(e) => handleChange(e, "project", index, descIndex)}
                      />
                      <button onClick={() => handleDescriptionRemove("project", index, descIndex)}>
                        <MinusCircledIcon />
                      </button>
                    </div>
                  );
                })}
                <button className="mt-3" onClick={() => handleDescriptionAdd("project", index)}>
                  <PlusCircledIcon />
                </button>
              </div>
            );
          })}

          <span className="text-2xl mt-10">Skills</span>
          <span className="text-lg mt-5">Languages</span>
          <ReactTags
            autoFocus={false}
            tags={resume.professional.skill.languages.map((string) => ({
              id: string,
              text: string
            }))}
            separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]}
            handleDelete={(i) => handleDelete(i, "languages")}
            handleAddition={(tag) => handleAddition(tag, "languages")}
            handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, "languages")}
            inputFieldPosition="bottom"
            placeholder="Add a language"
          />
          <span className="text-lg mt-5">Technologies</span>
          <ReactTags
            autoFocus={false}
            tags={resume.professional.skill.technologies.map((string) => ({
              id: string,
              text: string
            }))}
            separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]}
            handleDelete={(i) => handleDelete(i, "technologies")}
            handleAddition={(tag) => handleAddition(tag, "technologies")}
            handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, "technologies")}
            inputFieldPosition="bottom"
            placeholder="Add a technology"
          />
        </div>
        <div className="flex flex-col overflow-x-auto min-w-[210mm] w-[210mm]">
          <div className="p-[14mm] min-h-[290mm] h-[290mm] overflow-x-scroll border-2 border-black overflow-y-scroll">
            <Document
              personal={resume.personal}
              professional={resume.professional}
              education={resume.education}
            />
          </div>
          <span className="mt-3 w-full">
            Note: In order to obtain a single paged resume, follow the guidelines above. Any text that is being clipped will move into the next page
          </span>
        </div>
      </div>
      <button onClick={generatePDF} className="PrimaryButton">
        Generate PDF
      </button>
    </div>
  );
};

export default VerifyInformation;
