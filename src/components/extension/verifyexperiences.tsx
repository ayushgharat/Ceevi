import React, { useState, useEffect } from "react";

const VerifyExperiences = ({ onNext, finalData, setFinalData }) => {
  console.log(finalData)
    const [userData, setUserData] = useState(finalData["WORK_EXPERIENCE"]);
    const [isLoadingProject, setIsLoadingProject] = useState(true);

    const handleInputChange = (index, fieldName, value) => {
      const updatedUserData = [...userData];
      updatedUserData[index][fieldName] = value;
      setUserData(updatedUserData);
    };

    useEffect(() => {
      
    }, []);

    const experiences = userData.map((experience, index) => {
      return (
        <div key={index}>
          <input
            type="text"
            value={experience["Company_Name"]}
            onChange={(e) =>
              handleInputChange(index, "Company_Name", e.target.value)
            }
          />
          <input
            type="text"
            value={experience["Position_Title"]}
            onChange={(e) =>
              handleInputChange(index, "Position_Title", e.target.value)
            }
          />

          <input
            type="text"
            value={experience["Start_Date"]}
            onChange={(e) =>
              handleInputChange(index, "Start_Date", e.target.value)
            }
          />

          <input
            type="text"
            value={experience["End_Date"]}
            onChange={(e) =>
              handleInputChange(index, "End_Date", e.target.value)
            }
          />

          <textarea
            className="text-black text-sm rounded-xl bg-slate-400 mt-2 font-kodchasan mb-7 w-full resize-none p-2"
            id="job_info"
            value={experience["Description"]}
            rows={6}
            onChange={(e) =>
              handleInputChange(index, "Description", e.target.value)
            }
          ></textarea>
        </div>
      );
    });
    return (
      <div className="w-80 min-h-[500px] p-10 ">
        <span className="text-2xl font-kodchasan">Verify information</span>
        <div className="w-8 h-1 bg-black mt-4" />
        {experiences}

        <button className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3">
          <span className="mx-3 text-white text-base font-kodchasan">
            Previous
          </span>
        </button>
        <button className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3" onClick={onNext}>
          <span className="mx-3 text-white text-base font-kodchasan">Next</span>
        </button>
      </div>
    );
  };

  export default VerifyExperiences;