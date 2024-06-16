import { ChevronLeftIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const VerifySkills = ({
  finalData,
  generateResume,
}) => {
  
  const [userData, setUserData] = useState(finalData.professional.skill);
  console.log(finalData)
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const handleInputChange = (tagName, value) => {
    const updatedUserData = [...userData];
    updatedUserData[tagName] = value;
    setUserData(updatedUserData);
  };

  const handleTagChange = (tagName, newTags) => {
    setUserData({...userData, [tagName]: newTags});
  };

  const handleNext = () => {

    // Call onNext to proceed to the next step
    generateResume(userData);
  };

  const renderTagComponent = (tagName) => {
    const initialTags = userData[tagName] || [];
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
      const updatedTags = [...userData[tagName]];
      updatedTags.splice(i, 1);
      handleTagChange(tagName, updatedTags);
    };

    const handleAddition = (tag) => {
      const updatedTags = [...userData[tagName], tag.text];
      handleTagChange(tagName, updatedTags)
    };

    const handleDrag = (tag, currPos, newPos) => {
      const updatedTags = [...userData[tagName]];
      const [movedTag] = updatedTags.splice(currPos, 1);
      updatedTags.splice(newPos, 0, movedTag);
      handleTagChange(tagName, updatedTags);
    };

    const handleTagClick = (index) => {
      console.log(`The tag at index ${index} of ${tagName} was clicked`);
    };

    return (
      <div className="mt-2 font-extension-text">
        <span className="font-semibold text-xl">Languages</span>
        <ReactTags
        // classNames={{
        //   tags:"bg-green-200 rounded-xl p-3 mb-2 me-2"
        // }}
          tags={userData[tagName].map((string) => ({
            id: string,
            text: string,
          }))}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          placeholder="Add a skill for this project"
        />
      </div>
    );
  };

  return (
    <div className="w-[400px] rounded-3xl p-8 bg-white flex flex-col place-content-between ">
      <div className="flex flex-row items-start mb-5">
        <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
        <span className="ms-2 font-extension-text text-lg">
          Verify Skills:
        </span>
      </div>

      {renderTagComponent("languages")}
      {renderTagComponent("technologies")}

    
      <button
        className="PrimaryButton mt-4"
        onClick={handleNext}
      >
        <span>
          Generate Resume
        </span>
      </button>
    </div>
  );
};

export default VerifySkills;
