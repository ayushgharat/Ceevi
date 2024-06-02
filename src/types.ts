export interface PersonalData {
    first_name: string;
    last_name: string
    email: string;
    phone_number: string;
    linkedin: string;
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
    start_date?: string;
    end_date?: string;
    description?: string;
  }
  
  export interface ProjectItem {
    name?: string;
    skills?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
  }

  export interface EducationItem {
    name?: string;
    degree_level?: string;
    major?: string;
    location?: string;
    gpa?: string;
    start_date?: string;
    end_date?: string;
  }