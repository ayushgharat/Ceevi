export interface PersonalData {
    name: string;
    email: string;
    phoneNumber: string;
    linkedIn: string;
    github: string;
  }

  export interface UserData {
    user_info?: undefined;
    email: string;
    // Add other properties as needed
  }
  
  export interface Props {
    setActiveStep: (step: number) => void;
    handlePersonalInfo: (personalData: PersonalData) => void
  }

  export interface FormUserInfo {
    personal: PersonalData,
    professional: ProfessionalData,
    education: EducationItem
  }

  export interface ProfessionalData {
    experience: ExperienceItem[];
    project: ProjectItem[];
    skill: string
  }
  
  export interface ExperienceItem {
    company?: string;
    role?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }
  
  export interface ProjectItem {
    name?: string;
    skills?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }

  export interface EducationItem {
    name?: string;
    degreeLevel?: string;
    major?: string;
    location?: string;
    gpa?: string;
    startDate?: string;
    endDate?: string;
  }