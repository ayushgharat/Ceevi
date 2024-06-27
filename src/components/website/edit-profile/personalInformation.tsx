import { Input, Stack, Button } from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import type { PersonalData } from "~types";


const PersonalInformation = ({ setActiveStep, handlePersonalInfo }) => {
  const [personalData, setPersonalData] = useState<PersonalData>({
    first_name: "",
    last_name:"",
    email: "",
    phone_number: "",
    linkedin: "",
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
        placeholder="First Name"
        name="first_name"
        value={personalData.first_name}
        onChange={handleChange}
      />
      <Input
        placeholder="Last Name"
        name="last_name"
        value={personalData.last_name}
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
        name="phone_number"
        value={personalData.phone_number}
        onChange={handleChange}
      />
      <Input
        placeholder="LinkedIn"
        name="linkedin"
        value={personalData.linkedin}
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
