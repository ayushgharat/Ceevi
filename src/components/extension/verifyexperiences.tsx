import "~style.css"

import { ChevronLeftIcon } from "@radix-ui/react-icons"
import React, { useEffect, useState } from "react"

const VerifyExperiences = ({ onNext, finalData }) => {
  const [userData, setUserData] = useState(finalData.professional.experience)
  const [isLoadingProject, setIsLoadingProject] = useState(true)

  //console.log(userData)

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
            type="text"
            value={experience.start_date}
            onChange={(e) =>
              handleInputChange(experienceIndex, "start_date", e.target.value)
            }
          />
          <input
            className="ExtensionFormInput"
            type="text"
            value={experience.end_date}
            onChange={(e) =>
              handleInputChange(experienceIndex, "end_date", e.target.value)
            }
          />
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
        <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
        <span className="ms-2 font-extension-text text-lg">
          Enter the job Information:
        </span>
      </div>
      {experiences}

      <button
        className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-white text-[16px] font-semibold font-extension-title rounded-[29px] w-full py-2 shadow-[0_4px_0_rgba(0,0,0,0.25)]"
        onClick={onNext}>
        <span className="mx-3 text-white text-base font-kodchasan">Next</span>
      </button>
    </div>
  )
}

export default VerifyExperiences
