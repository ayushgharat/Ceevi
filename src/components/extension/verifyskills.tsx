import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const VerifySkills = ({
  finalData,
  generateResume,
}) => {
  console.log(finalData)
  const [userData, setUserData] = useState(finalData["skill"]);

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
    console.log(tagName)
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
      <div className="group">
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
        />
      </div>
    );
  };

  return (
    <div className="w-80 min-h-[500px] p-10 ">
      <span className="text-2xl font-kodchasan">
        Verify Skills
      </span>
      <div className="w-8 h-1 bg-black mt-4" />

      {renderTagComponent("languages")}
      {renderTagComponent("technologies")}

      <button className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3">
        <span className="mx-3 text-white text-base font-kodchasan">
          Previous
        </span>
      </button>
      <button
        className="bg-[#64E926] bottom-0 mb-5 ms-10 left-0 right-0 w-60 rounded-lg py-3"
        onClick={handleNext}
      >
        <span className="mx-3 text-white text-base font-kodchasan">
          Generate Resume
        </span>
      </button>
    </div>
  );
};

export default VerifySkills;
