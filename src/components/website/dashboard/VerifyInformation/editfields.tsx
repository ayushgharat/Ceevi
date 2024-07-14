import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
//import * as Switch from '@radix-ui/react-switch';
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input"

import IndexOptions from "~popup"

const EditFields = ({
  navigateToJobInfo,
  resume,
  handleChange,
  handleDescriptionRemove,
  handleDescriptionAdd,
  handleDelete,
  handleAddition,
  handleDrag,
  resumeOptions,
  setResumeOptions
}) => {
  console.log(resumeOptions)

  return (
    <div className="m-2">
      <div className="flex flex-row gap-x-3 justify-between">
        <span className="font-poppins text-3xl text-black">
          Verify The Information
        </span>
        <button
          className="rounded-2xl border-[1px] border-black p-3 font-dmsans border-opacity-50"
          onClick={navigateToJobInfo}>
          Regenerate Resume
        </button>
      </div>

      <div className="BuilderContainer">
        <span className="font-poppins text-2xl">Personal Details</span>
        <div className="grid grid-cols-2 gap-x-2 mt-3">
          <div className="flex flex-row items-center space-x-2">
            <input
              type="checkbox"
              checked={resumeOptions.showGithub}
              onChange={(e) =>
                setResumeOptions({
                  ...resumeOptions,
                  showGithub: !resumeOptions.showGithub
                })
              }></input>
            <Label>Show Github URL</Label>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <input
              type="checkbox"
              checked={resumeOptions.showLinkedin}
              onChange={() =>
                setResumeOptions({
                  ...resumeOptions,
                  showLinkedin: !resumeOptions.showLinkedin
                })
              }></input>
            <Label>Show Linkedin URL</Label>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <input
              type="checkbox"
              checked={resumeOptions.showPortfolio}
              onChange={() =>
                setResumeOptions({
                  ...resumeOptions,
                  showPortfolio: !resumeOptions.showPortfolio
                })
              }></input>
            <Label>Show Portfolio URL</Label>
          </div>
        </div>
      </div>

      <div className="BuilderContainer">
        <span className="text-2xl">Education</span>
        {resume.education.map((education, index) => {
          return (
            <div key={index} className="flex flex-col gap-y-2 mt-5">
              <input
                className="BuilderTitleInput"
                name="company"
                value={education.name}
                onChange={(e) => handleChange(e, "experience", index)}
              />
              <input
                name="role"
                className="min-w-[250px] w-full"
                value={education.gpa}
                onChange={(e) => handleChange(e, "experience", index)}
              />

              <div className="flex flex-row items-center space-x-2">
                <input
                  type="checkbox"
                  checked={resumeOptions.education.showGPA[index].value}
                  onChange={() =>
                    setResumeOptions((prev) => {
                      const updatedShowGPA = [...prev.education.showGPA];
                      updatedShowGPA[index].value = !updatedShowGPA[index].value;
              
                      return {
                        ...prev,
                        education: {
                          ...prev.education,
                          showStartDate: updatedShowGPA,
                        },
                      };
                    })
                  }></input>
                <Label>Show GPA</Label>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <input
                  type="checkbox"
                  checked={resumeOptions.education.showStartDate[index].value}
                  onChange={() =>
                    setResumeOptions((prev) => {
                      const updatedShowStartDate = [...prev.education.showStartDate];
                      updatedShowStartDate[index].value = !updatedShowStartDate[index].value;
              
                      return {
                        ...prev,
                        education: {
                          ...prev.education,
                          showStartDate: updatedShowStartDate,
                        },
                      };
                    })
                  }
                  ></input>
                <Label>Show Start Date</Label>
              </div>
            </div>
          )
        })}
      </div>

      <div className="BuilderContainer">
        <span className="text-2xl">Experiences</span>
        {resume.professional.experience.map((experience, index) => {
          return (
            <div key={index} className="flex flex-col gap-y-2 mt-5">
              <input
                className="BuilderTitleInput"
                name="company"
                value={experience.company}
                onChange={(e) => handleChange(e, "experience", index)}
              />
              <input
                name="role"
                className="BuilderSubtitleInput"
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
                    <button
                      onClick={() =>
                        handleDescriptionRemove("experience", index, descIndex)
                      }>
                      <MinusCircledIcon />
                    </button>
                  </div>
                )
              })}
              <button
                className="mt-3"
                onClick={() => handleDescriptionAdd("experience", index)}>
                <PlusCircledIcon />
              </button>
            </div>
          )
        })}
      </div>

      <div className="BuilderContainer">
        <span className="text-2xl mt-10">Projects</span>
        {resume.professional.project.map((project, index) => {
          return (
            <div key={index} className="flex flex-col mt-5">
              <input
                name="name"
                className="BuilderTitleInput"
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
                handleAddition={(tag) =>
                  handleAddition(tag, "projectSkills", index)
                }
                handleDrag={(tag, currPos, newPos) =>
                  handleDrag(tag, currPos, newPos, "projectSkills", index)
                }
                inputFieldPosition="bottom"
                placeholder="Add a skill"
              />
              {project.description.map((item, descIndex) => {
                return (
                  <div key={descIndex} className="flex flex-row gap-x-3">
                    <input
                      value={item.value}
                      className="min-w-[250px] w-full"
                      onChange={(e) =>
                        handleChange(e, "project", index, descIndex)
                      }
                    />
                    <button
                      onClick={() =>
                        handleDescriptionRemove("project", index, descIndex)
                      }>
                      <MinusCircledIcon />
                    </button>
                  </div>
                )
              })}
              <button
                className="mt-3"
                onClick={() => handleDescriptionAdd("project", index)}>
                <PlusCircledIcon />
              </button>
            </div>
          )
        })}
      </div>

      <div className="BuilderContainer flex flex-col">
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
          handleDrag={(tag, currPos, newPos) =>
            handleDrag(tag, currPos, newPos, "languages")
          }
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
          handleDrag={(tag, currPos, newPos) =>
            handleDrag(tag, currPos, newPos, "technologies")
          }
          inputFieldPosition="bottom"
          placeholder="Add a technology"
        />
      </div>

      <div className="BuilderContainer flex flex-col">
        <span className="font-poppins text-2xl">Document Details</span>
        <label className="mt-2">Document Name</label>
        <input
          className="border-[1px] border-black rounded-xl p-2"
          value={resumeOptions.name}
          onChange={(e) =>
            setResumeOptions({ ...resumeOptions, name: e.target.value })
          }></input>
      </div>
    </div>
  )
}

export default EditFields
