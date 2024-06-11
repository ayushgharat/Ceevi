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

  const handleDescriptionChange = (experienceIndex, descriptionIndex, value) => {
    const updatedUserData = [...userData]
    updatedUserData[experienceIndex].description[descriptionIndex].value = value
    setUserData(updatedUserData)
  }

  useEffect(() => {
    setIsLoadingProject(false)
  }, [])

  const experiences = userData.map((experience, experienceIndex) => {
    return (
      <div key={experienceIndex}>
        <input
          type="text"
          value={experience.company}
          onChange={(e) =>
            handleInputChange(experienceIndex, "company", e.target.value)
          }
        />
        <input
          type="text"
          value={experience.role}
          onChange={(e) =>
            handleInputChange(experienceIndex, "role", e.target.value)
          }
        />
        <input
          type="text"
          value={experience.start_date}
          onChange={(e) =>
            handleInputChange(experienceIndex, "start_date", e.target.value)
          }
        />
        <input
          type="text"
          value={experience.end_date}
          onChange={(e) => handleInputChange(experienceIndex, "end_date", e.target.value)}
        />
        {experience.description.map((item, descriptionIndex) => {
          return (
            <textarea
              key={descriptionIndex}
              className="text-black text-sm rounded-xl bg-slate-400 font-kodchasan mb-2 w-full resize-none p-2"
              id="job_info"
              value={item.value}
              rows={2}
              onChange={(e) =>
                handleDescriptionChange(experienceIndex, descriptionIndex, e.target.value)
              }
            ></textarea>
          )
        })}
      </div>
    )
  })

  return (
    <div className="w-100 min-h-[500px] p-8 ">
      <span className="text-2xl font-kodchasan">Verify information</span>
      <div className="w-8 h-1 bg-black mt-4" />
      {experiences}

      <button className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3">
        <span className="mx-3 text-white text-base font-kodchasan">
          Previous
        </span>
      </button>
      <button
        className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3"
        onClick={onNext}
      >
        <span className="mx-3 text-white text-base font-kodchasan">Next</span>
      </button>
    </div>
  )
}

export default VerifyExperiences
