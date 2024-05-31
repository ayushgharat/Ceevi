import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const VerifyProjects = ({ onNext, finalData, setFinalData }) => {
  const [userData, setUserData] = useState(finalData["projects"]);

  const handleInputChange = (index, fieldName, value) => {
    const updatedUserData = [...userData];
    updatedUserData[index][fieldName] = value;
    setUserData(updatedUserData);
  };

  const handleTagDrag = (tag, currPos, newPos, index) => {
    const updatedUserData = [...userData];
    const { Technologies } = updatedUserData[index];
    
    updatedUserData[index].Technologies.splice(currPos, 1),
    updatedUserData[index].Technologies.splice(newPos, 0, tag.text)
  
    setUserData(updatedUserData);
  };

  const handleNext = () => {

    // Update finalData with the new array of strings
    setFinalData({ ...finalData, projects: userData });

    // Call onNext to proceed to the next step
    onNext();
  };

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
            value={project["Name"]}
            onChange={(e) => handleInputChange(index, "Name", e.target.value)}
          />
          <input
            type="text"
            value={project["Achievements"]}
            onChange={(e) =>
              handleInputChange(index, "Achievements", e.target.value)
            }
          />
          <input
            type="text"
            value={project["Project_Date"]}
            onChange={(e) =>
              handleInputChange(index, "Project_Date", e.target.value)
            }
          />
          <textarea
            className="text-black text-sm rounded-xl bg-slate-400 mt-2 font-kodchasan mb-7 w-full resize-none p-2"
            value={project["Description"]}
            rows={6}
            onChange={(e) =>
              handleInputChange(index, "Description", e.target.value)
            }
          ></textarea>
          <ReactTags
            tags={userData[index].Technologies.map((string) => ({
              id: string,
              text: string,
            }))}
            delimiters={[188, 13]} // Comma and Enter keycodes
            handleDelete={(i) => {
              const updatedTechnologies = [...project.Technologies];
              updatedTechnologies.splice(i, 1);
              handleInputChange(index, "Technologies", updatedTechnologies);
            }}
            handleAddition={(tag) => {
              const updatedTechnologies = [...project.Technologies, tag.text];
              handleInputChange(index, "Technologies", updatedTechnologies);
            }}
            handleDrag={(tag, currPos, newPos) => handleTagDrag(tag, currPos, newPos, index)}
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
        onClick={handleNext}
      >
        <span className="mx-3 text-white text-base font-kodchasan">Next</span>
      </button>
    </div>
  );
};

export default VerifyProjects;
