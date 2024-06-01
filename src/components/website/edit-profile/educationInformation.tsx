import { Input, Stack, Button, Select } from "@chakra-ui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EducationItem } from "~types";



const EducationInformation = ({setActiveStep, handleEducationalInfo} : any) => {
  const [educationData, setEducationData] = useState<EducationItem[]>([]);

  const handleChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const updatedEducationData = [...educationData];
    updatedEducationData[index] = {
      ...updatedEducationData[index],
      [name]: value,
    };
    setEducationData(updatedEducationData);
  };

  const handleAddEducation = () => {
    setEducationData([...educationData, {}]);
  };

  const handleRemoveEducation = (index: number) => () => {
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    handleEducationalInfo(educationData)
    console.log("Submitted data:", educationData);
    setActiveStep(2)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {educationData.map((education, index) => (
          <Stack key={index} spacing={2}>
            <Input
              placeholder="Name"
              name="name"
              value={education.name}
              onChange={handleChange(index)}
            />
            <Select
              placeholder="Degree Level"
              name="degreeLevel"
              value={education.degreeLevel}
              onChange={handleChange(index)}
            >
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </Select>
            <Input
              placeholder="Major"
              name="major"
              value={education.major}
              onChange={handleChange(index)}
            />
            <Input
              placeholder="Location"
              name="location"
              value={education.location}
              onChange={handleChange(index)}
            />
            <Input
              placeholder="GPA"
              name="gpa"
              value={education.gpa}
              onChange={handleChange(index)}
            />
            <Input
              placeholder="Start Date"
              name="startDate"
              type="month"
              value={education.startDate}
              onChange={handleChange(index)}
            />
            <Input
              placeholder="End Date"
              name="endDate"
              type="month"
              value={education.endDate}
              onChange={handleChange(index)}
            />
            <Button onClick={handleRemoveEducation(index)} variant="ghost">Remove</Button>
          </Stack>
        ))}
        <Button onClick={handleAddEducation}>Add Education</Button>
        <Button type="submit">Next</Button>
      </Stack>
    </form>
  );
};

export default EducationInformation;
