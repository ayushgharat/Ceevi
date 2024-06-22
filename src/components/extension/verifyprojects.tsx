import "~style.css"

import { ChevronLeftIcon } from "@radix-ui/react-icons"
import React, { useEffect, useState } from "react"
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input"

import { convertDate } from "~utils/helper/helper"

const VerifyProjects = ({
  onNext,
  finalData,
  setFinalData,
  navigateToVerifyExperiences
}) => {
  const [userData, setUserData] = useState(finalData.professional.project)
  const [presentEndDate, setPresentEndDate] = useState(
    userData.map((project) => project.end_date === "Present")
  )

  const handleInputChange = (index, fieldName, value) => {
    const updatedUserData = [...userData]
    updatedUserData[index][fieldName] = value
    setUserData(updatedUserData)
  }

  const handleTagDrag = (tag, currPos, newPos, index) => {
    const updatedUserData = [...userData]
    const { skills } = updatedUserData[index]

    updatedUserData[index].skills.splice(currPos, 1),
      updatedUserData[index].skills.splice(newPos, 0, { value: tag.text })

    setUserData(updatedUserData)
  }

  const handleDescriptionChange = (projectIndex, descriptionIndex, value) => {
    const updatedUserData = [...userData]
    updatedUserData[projectIndex].description[descriptionIndex].value = value
    setUserData(updatedUserData)
  }

  const handleCheckboxChange = (index) => {
    const updatedPresentEndDate = [...presentEndDate]
    updatedPresentEndDate[index] = !updatedPresentEndDate[index]
    setPresentEndDate(updatedPresentEndDate)

    if (updatedPresentEndDate[index]) {
      handleInputChange(index, "end_date", "Present")
    } else {
      handleInputChange(index, "end_date", "")
    }
  }

  const handleNext = () => {
    const updatedData = {
      ...finalData,
      professional: {
        ...finalData.professional,
        project: userData
      }
    }
    setFinalData(updatedData)
    onNext()
  }

  return (
    <div className="w-[400px] rounded-3xl p-8 bg-white flex flex-col place-content-between">
      <div className="flex flex-row items-start mb-10">
        <button onClick={navigateToVerifyExperiences}>
          <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
        </button>
        <span className="ms-2 font-extension-text text-lg">
          Verify Project Information:
        </span>
      </div>
      {userData.map((project, index) => (
        <div key={index} className="font-extension-text text-base mb-8">
          <input
            type="text"
            className="ExtensionFormInput"
            value={project.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <input
              type="month"
              className="ExtensionFormInput"
              value={project.start_date}
              onChange={(e) =>
                handleInputChange(index, "start_date", e.target.value)
              }
            />

            {presentEndDate[index] ? (
              <input
                className="ExtensionFormInput"
                type="text"
                value="Present"
                readOnly
              />
            ) : (
              <input
                className="ExtensionFormInput"
                type="month"
                value={project.end_date}
                onChange={(e) =>
                  handleInputChange(index, "end_date", e.target.value)
                }
              />
            )}
          </div>

          <div className="flex col-span-2 justify-end gap-x-3">
            <input
              type="checkbox"
              value="Present"
              checked={presentEndDate[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <label>Present</label>
          </div>
          {project.description.map((item, descIndex) => (
            <textarea
              key={descIndex}
              className="ExtensionFormTextArea"
              value={item.value}
              rows={2}
              onChange={(e) =>
                handleDescriptionChange(index, descIndex, e.target.value)
              }></textarea>
          ))}
          <ReactTags
            tags={userData[index].skills.map(({ value }) => ({
              id: value,
              text: value,
              className: ""
            }))}
            separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]} // Comma and Enter keycodes
            handleDelete={(i) => {
              const updatedTechnologies = [...project.skills]
              updatedTechnologies.splice(i, 1)
              handleInputChange(index, "skills", updatedTechnologies)
            }}
            handleAddition={(tag) => {
              const updatedTechnologies = [
                ...project.skills,
                { value: tag.text }
              ]
              handleInputChange(index, "skills", updatedTechnologies)
            }}
            handleDrag={(tag, currPos, newPos) =>
              handleTagDrag(tag, currPos, newPos, index)
            }
            handleTagClick={(tagIndex) =>
              console.log(`Tag clicked at index ${tagIndex}`)
            }
            inputFieldPosition="bottom"
            placeholder="Add a skill for this project"
          />
        </div>
      ))}
      <button className="PrimaryButton" onClick={handleNext}>
        <span>Next</span>
      </button>
    </div>
  )
}

export default VerifyProjects
