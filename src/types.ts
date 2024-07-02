import { z } from "zod";

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

  export const testingResume = {
    personal: {
      first_name: "Ayush",
      last_name: "Gharat",
      email: "gharatayush27@gmail.com",
      phone_number: "4709396771",
      linkedin: "https://linkedin.com/in/ayush-gharat",
      github: "https://github.com/ayushgharat"
    },
    education: [
      {
        name: "Georgia Tech",
        degree_level: "Bachelors",
        major: "Computer Science",
        location: "Atlanta, GA",
        gpa: "4.0",
        start_date: "2022-08",
        end_date: "2026-03"
      },
      {
        name: "Stanford",
        degree_level: "Masters",
        major: "Computer Science",
        location: "Palo Alto",
        gpa: "3.7",
        start_date: "2026-05",
        end_date: "2027-05"
      }
    ],
    professional: {
      project: [
        {
          name: "CoFiscal",
          skills: [{ value: "Next.js" }, { value: "Website Development" }],
          start_date: "2023-08",
          end_date: "2023-08",
          description: [
            {
              value:
                "Developed CoFiscal, a cutting-edge financial platform powered by AI to empower borrowers with data-driven insights for informed loan decisions."
            },
            {
              value:
                "Implemented SMOTE to address extreme data skewness and optimized OCR feature for accurate data extraction, achieving 92.03% accuracy on unseen data with LightGBM."
            },
            {
              value:
                "Designed and developed a fullstack interface with a Next.js web app featuring React, Tailwind CSS, and Flask backend for multiple model calls. Won Capital One best Financial Tool Award at HackGT 10."
            }
          ]
        },
        {
          name: "CeeVi: Chrome Extension",
          skills: [{ value: "Next.js" }],
          start_date: "2023-05",
          end_date: "2023-08",
          description: [
            {
              value: "Created a Chrome extension that automates resume building."
            },
            {
              value:
                "Developed a chatbot interface within the extension for enhanced user experience."
            }
          ]
        },
        {
          name: "Aashwas",
          skills: [{ value: "Entrepreneurship" }, { value: "Advocacy" }],
          start_date: "2023-05",
          end_date: "2023-08",
          description: [
            {
              value:
                "Positively impacted 5,000+ frontline health workers across 80+ cities in India during CoVID-19 lockdown."
            },
            {
              value:
                "Organized virtual activities like comedy shows and riddle hunts for healthcare workers to de-stress."
            },
            {
              value:
                "Raised $10,200 to supply 2,400 PPE Kits and 8,000+ snacks to St. John’s Hospital, Bengaluru. Presented at the United Nations HQ at the Activate Impact Summit."
            }
          ]
        }
      ],
  
      skill: {
        languages: ["Python", "Javascript", "Java"],
        technologies: ["Selenium", "JUnit", "Postman", "Cypress"]
      },
      experience: [
        {
          company: "OrangeHealth Labs",
          role: "SWE Intern",
          start_date: "2023-05",
          end_date: "2023-08",
          location: "Bengaluru, India",
          description: [
            {
              value:
                "Developed an admin dashboard website using Next.js, React, and MySQL for marketing team empowerment."
            },
            {
              value:
                "Implemented REST API for CRUD operations, utilizing tools like Docker, Prisma, Auth.js."
            },
            {
              value:
                "Utilized SSG, SSA, RadixUI, Amazon ECR to build efficient solutions, saving $20,000/year."
            }
          ]
        },
        {
          company: "Nutrivend",
          role: "Software Developer",
          start_date: "2022-07",
          end_date: "Present",
          location: "Atlanta, GA",
          description: [
            {
              value:
                "Built Tauri App with Rust backend for vending machine interface, focusing on user transactions."
            },
            {
              value:
                "Developed stylized pages and components using Next.js, React, Tailwind for user workflows."
            },
            {
              value:
                "Implemented React and Tailwind for enhancing user experience in purchase workflow."
            }
          ]
        }
      ]
    }
  }

  export type UserProfile = {
    profile: {
      professional: any; // Adjust the type as per your actual data structure
    }[];
  };

  export const openai_generated_resume_structure =  z.object(
    {
      experience: z.array(
        z.object({
          company: z.string(),
          role: z.string(),
          start_date: z.string(),
          end_date: z.string(),
          location: z.string(),
          description: z.array(z.object({ value: z.string() }))
        })
      ),
      project: z.array(
       z.object( {
          name: z.string(),
          skills: z.array(z.object({ value: z.string() })),
          start_date: z.string(),
          end_date: z.string(),
          description: z.array(z.object({ value: z.string() }))
        })
      ),
      skill: z.object({
        languages: z.array(z.string()),
        technologies: z.array(z.string())
      })
    })
  