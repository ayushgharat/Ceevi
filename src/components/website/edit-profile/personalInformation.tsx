import { Input, Stack, Button } from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import type { PersonalData } from "~types";


const PersonalInformation = ({ setActiveStep, handlePersonalInfo }) => {
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
    github: ""
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    handlePersonalInfo(personalData)
    console.log("Submitted data:", personalData);
    setActiveStep(1);
  };

  return (
    <Stack spacing={4}>
      <Input
        placeholder="Name"
        name="name"
        value={personalData.name}
        onChange={handleChange}
      />
      <Input
        placeholder="Email"
        name="email"
        value={personalData.email}
        onChange={handleChange}
      />
      <Input
        placeholder="Phone Number"
        name="phoneNumber"
        value={personalData.phoneNumber}
        onChange={handleChange}
      />
      <Input
        placeholder="LinkedIn"
        name="linkedIn"
        value={personalData.linkedIn}
        onChange={handleChange}
      />
      <Input
        placeholder="Github"
        name="github"
        value={personalData.github}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Next</Button>
    </Stack>
  );
};

export default PersonalInformation;
