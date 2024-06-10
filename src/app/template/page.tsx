import { Document } from "document";


const { personal, professional, education } = {
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
          name: "CeeVi: Chrome Extension",
          skills: ["Next.js", "Plasmo"],
          start_date: "2023-05",
          end_date: "2023-08",
          description:
            "Made a chrome extension that automatically builds a resume",
          location: "Made a chatbo",
          company: "CeeV"
        },
        {
          name: "Aashwas",
          skills: ["Entrepreneurship", "Social Advocacy"],
          start_date: "2023-05",
          end_date: "2023-08",
          description: "Made a social intiative"
        }
      ],
      experience: [
        {
          company: "CSX Tech",
          role: "Technology Intern",
          location: "Jacksonville, Florida",
          start_date: "2024-05",
          end_date: "2024-08",
          description:
            "Made a chatbot. Met cool people. Spent summer in Jacksonville"
        },
        {
          company: "OrangeHealth Labs",
          role: "SWE Intern",
          location: "Bengaluru",
          start_date: "2023-05",
          end_date: "2023-08",
          description: "Made a website for them. Did cool PM stuff. Had fun"
        }
      ],
      skill: {
        languages: ["Java", "Python"],
        technologies: ["VS Code", "Website Development"]
      }
    }
  }

const Template = () => {
    return ( <Document personal={personal} professional={professional} education={education}/> );
}
 
export default Template;