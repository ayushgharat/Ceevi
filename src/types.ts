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
          skills: [{ value: "Next.js" }, { value: "React" },  { value: "Flask" },  { value: "PaLM" }],
          start_date: "2023-08",
          end_date: "2023-08",
          description: [
            {
              value:
                "Developed Web App to assist borrowers to make optimized loan decisions based on their predicted default probability"
            },
            {
              value:
                "Deployed LightGBM model for default probability with 92% accuracy, trained on 250,000 datapoints pre-SMOTE"
            },
            {
              value:
                "Used Google’s PaLM-2 to provide insights into personal default insights and PDF-miner to reduce user input by 75%"
            },
            {
              value:
                "Led team of 4 in developing project in 36 hours, Won Capital One Best Financial Hack award at Hack GT ’23"
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
                "Conducted online events to de-stress medical workforce, positively impacting 5,000+ health workers across 80 cities."
            },
            {
              value:
                "Fundraised $10,200 across India, US to supply 2,400 PPE Kits, 8,000+ meals to St. John’s Hospital, Bengaluru"
            },
            {
              value:
                "Presented @ United Nations HQ in New York in Dec 2022 @ Activate Impact Summit to International delegates"
            },
            {
              value:
                " Recognized by Diana Award 2022 and International Youth Conference as a Youth Ambassador from India"
            }
          ]
        }
      ],
  
      skill: {
        languages: ["Java", "Javascript", "Typescript", "JSX", "Python", "XML", "Dart", "SQL"],
        technologies: ["Next.js", "React", "React Native", "Node.js", "Express.js", "Flutter", "MongoDB", "PostgresQL", "MySQL"]
      },
      experience: [
        {
          company: "CSX Technology",
          role: "Technology Intern",
          start_date: "2024-05",
          end_date: "Present",
          location: "Jacksonville, FL",
          description: [
            {
              value:
                "Finetuning LLM-based IT help desk chatbot integrated with ServiceNow to reduce traffic to technical support by 85%"
            },
            {
              value:
                "Developing vector search model integrated with generative AI to reduce access time for inhouse data bank by 75%"
            },
            {
              value:
                "Leading intern team using SCRUM principles to build LLM chatbot for HR & payroll queries for 26,000 employees."
            }
          ]
        },
        {
          company: "OrangeHealth Labs (Diagnostic Test Provider - Y Combinator S’20) ",
          role: "Software Engineer Intern",
          start_date: "2023-05",
          end_date: "2023-08",
          location: "Bengaluru, India",
          description: [
            {
              value:
                "Independently developed CMS website to edit & publish landing pages, serving 200,000 potential customers monthly."
            },
            {
              value:
                "Used Next.js, React, MySQL along with SSG, SSR for performance optimization, 90+ on all Lighthouse Indexes"
            },
            {
              value:
                "Setup REST API for CRUD ops. Conceived idea with PM saving $20,000/year by replacing outsourced software."
            }
          ]
        },
        {
          company: "NutriVend (Custom Fitness Supplements) ",
          role: "Front End Developer Intern",
          start_date: "2022-08",
          end_date: "2023-01",
          location: "Atlanta, GA",
          description: [
            {
              value:
                "Developed initial Tauri App on Rust backend for vending machine interface to process transactions for onsite payments."
            },
            {
              value:
                "Conducted A/B testing with 15 consumers, incorporated feedback to iteratively design user purchase workflow."
            },
            {
              value:
                "Built stylized pages & associated component using Next.js & React, used agile scrum methods alongside CI/CD pipeline"
            }
          ]
        }
      ]
    }
  }
  