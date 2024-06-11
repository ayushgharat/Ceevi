"use client"

import React, { useEffect, useState } from "react"
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input"

const VerifyProjects = ({ onNext, finalData, setFinalData }) => {
  // const skills = [{value: "Next.js"}, {value: "Website dev"}]

  const [userData, setUserData] = useState(finalData.professional.project)
  console.log(userData)

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

  const handleNext = () => {
    // Update finalData with the new array of strings
    // setFinalData({
    //   education: finalData.education,
    //   personal: finalData.personal,
    //   professional: {
    //     experience: finalData.experience,
    //     skill: finalData.skill,
    //     project: userData
    //   }
    // })

    // Call onNext to proceed to the next step
    onNext()
  }

  return (
    <div className="w-80 min-h-[500px] p-10 ">
      <span className="text-2xl font-kodchasan">
        Verify project information
      </span>
      <div className="w-8 h-1 bg-black mt-4" />
      {userData.map((project, index) => (
        <div key={index}>
          <input
            type="text"
            value={project.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          {/* <input
            type="text"
            value={project["Achievements"]}
            onChange={(e) =>
              handleInputChange(index, "Achievements", e.target.value)
            }
          /> */}
          <input
            type="text"
            value={project.start_date}
            onChange={(e) =>
              handleInputChange(index, "start_date", e.target.value)
            }
          />
          <input
            type="text"
            value={project.end_date}
            onChange={(e) =>
              handleInputChange(index, "end_date", e.target.value)
            }
          />

          {project.description.map((item, descIndex) => (
            <textarea
              key={item.value}
              className="text-black text-sm rounded-xl bg-slate-400 mt-2 font-kodchasan mb-7 w-full resize-none p-2"
              value={item.value}
              rows={2}
              onChange={(e) =>
                //handleInputChange(index, "Description", e.target.value)
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
          />
        </div>
      ))}
      <button className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3">
        <span className="mx-3 text-white text-base font-kodchasan">
          Previous
        </span>
      </button>
      <button
        className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3"
        onClick={handleNext}>
        <span className="mx-3 text-white text-base font-kodchasan">Next</span>
      </button>
    </div>
  )
}

export default VerifyProjects
