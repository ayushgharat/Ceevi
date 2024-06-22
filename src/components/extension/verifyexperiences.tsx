import "~style.css"

import { ChevronLeftIcon } from "@radix-ui/react-icons"
import React, { useEffect, useState } from "react"

import { convertDate } from "~utils/helper/helper"

const VerifyExperiences = ({
  onNext,
  finalData,
  navigateToJobInfo,
  setFinalData
}) => {
  const [userData, setUserData] = useState(finalData.professional.experience)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [presentEndDate, setPresentEndDate] = useState(
    userData.map((experience) => experience.end_date === "Present")
  )

  const handleInputChange = (experienceIndex, fieldName, value) => {
    const updatedUserData = [...userData]
    updatedUserData[experienceIndex][fieldName] = value
    setUserData(updatedUserData)
  }

  const handleDescriptionChange = (
    experienceIndex,
    descriptionIndex,
    value
  ) => {
    const updatedUserData = [...userData]
    updatedUserData[experienceIndex].description[descriptionIndex].value = value
    setUserData(updatedUserData)
  }

  useEffect(() => {
    setIsLoadingProject(false)
  }, [])

  const handleSubmit = () => {
    const updatedData = {
      ...finalData,
      professional: {
        ...finalData.professional,
        experience: userData
      }
    }
    setFinalData(updatedData)
    onNext()
  }

  const handleCheckboxChange = (experienceIndex) => {
    const updatedPresentEndDate = [...presentEndDate]
    updatedPresentEndDate[experienceIndex] =
      !updatedPresentEndDate[experienceIndex]
    setPresentEndDate(updatedPresentEndDate)

    if (updatedPresentEndDate[experienceIndex]) {
      handleInputChange(experienceIndex, "end_date", "Present")
    } else {
      handleInputChange(experienceIndex, "end_date", "")
    }
  }

  const experiences = userData.map((experience, experienceIndex) => {
    return (
      <div key={experienceIndex} className="font-extension-text text-base mb-8">
        <input
          className="ExtensionFormInput"
          type="text"
          value={experience.company}
          onChange={(e) =>
            handleInputChange(experienceIndex, "company", e.target.value)
          }
        />
        <input
          type="text"
          className="ExtensionFormInput"
          value={experience.role}
          onChange={(e) =>
            handleInputChange(experienceIndex, "role", e.target.value)
          }
        />
        <div className="grid grid-cols-2 gap-x-4">
          <input
            className="ExtensionFormInput"
            type="month"
            value={experience.start_date}
            onChange={(e) =>
              handleInputChange(experienceIndex, "start_date", e.target.value)
            }
          />
            {presentEndDate[experienceIndex] ? (
              <input
                className="ExtensionFormInput ml-2"
                type="text"
                value="Present"
                readOnly
              />
            ) : (
              <input
                className="ExtensionFormInput ml-2"
                type="month"
                value={experience.end_date}
                onChange={(e) =>
                  handleInputChange(experienceIndex, "end_date", e.target.value)
                }
              />
            )}

          <div className="flex col-span-2 justify-end gap-x-3">
            <input
              type="checkbox"
              value="Present"
              checked={presentEndDate[experienceIndex]}
              onChange={() => handleCheckboxChange(experienceIndex)}
            />
            <label>Present</label>
          </div>
        </div>
        {experience.description.map((item, descriptionIndex) => {
          return (
            <textarea
              key={descriptionIndex}
              className="ExtensionFormTextArea"
              id="job_info"
              value={item.value}
              rows={2}
              onChange={(e) =>
                handleDescriptionChange(
                  experienceIndex,
                  descriptionIndex,
                  e.target.value
                )
              }></textarea>
          )
        })}
      </div>
    )
  })

  return (
    <div className="w-[400px] rounded-3xl p-8 bg-white flex flex-col place-content-between">
      <div className="flex flex-row items-start mb-10">
        <button onClick={navigateToJobInfo}>
          <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
        </button>
        <span className="ms-2 font-extension-text text-lg">
          Verify Experiences:
        </span>
      </div>
      {experiences}

      <button
        className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-white text-[16px] font-semibold font-extension-title rounded-[29px] w-full py-2 shadow-[0_4px_0_rgba(0,0,0,0.25)]"
        onClick={handleSubmit}>
        <span className="mx-3 text-white text-base font-kodchasan">Next</span>
      </button>
    </div>
  )
}

export default VerifyExperiences
