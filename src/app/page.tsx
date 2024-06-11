// Import your Client Component

import VerifyProjects from "~components/extension/verifyprojects";
import HomePage from "./home-page";

 
// async function getPosts() {
//   const res = await fetch('https://...')
//   const posts = await res.json()
//   return posts
// }
 
export default async function Page() {
  // Fetch data directly in a Server Component
  //const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  // return <HomePage />

  const resume = {
    "project": [
        {
            "name": "CoFiscal",
            "skills": [
                {
                    "value": "Next.js"
                },
                {
                    "value": "AI"
                },
                {
                    "value": "Machine Learning"
                },
                {
                    "value": "React"
                },
                {
                    "value": "Tailwind CSS"
                },
                {
                    "value": "Flask"
                }
            ],
            "start_date": "Oct 2023",
            "end_date": "Oct 2023",
            "description": [
                {
                    "value": "Developed a cutting-edge financial platform, CoFiscal, powered by AI to provide data-driven insights for informed loan decisions."
                },
                {
                    "value": "Implemented SMOTE to address extreme data skewness, optimized OCR for accurate data extraction, achieved 92.03% accuracy using LightGBM."
                },
                {
                    "value": "Designed and developed a fullstack interface with Next.js, React, and Tailwind CSS for SSR, while using Flask for backend operations."
                }
            ]
        },
        {
            "name": "mNutrition",
            "skills": [
                {
                    "value": "Android Development"
                },
                {
                    "value": "Youth Entrepreneurship"       
                },
                {
                    "value": "OpenCV"
                },
                {
                    "value": "Holistic Review"
                }
            ],
            "start_date": "Sep 2018",
            "end_date": "Sep 2022",
            "description": [
                {
                    "value": "Developed an Android App to assess malnutrition risk in children under 5, aiming to combat child mortality in India."
                },
                {
                    "value": "Created a cumulative severity calculator, collaborating with IBM Bengaluru for augmented reality diagnosis integration."
                },
                {
                    "value": "Reached the Regional Finals in Google Science Fair 2019 and received an Inspire Certificate by the Govt of India."
                }
            ]
        },
        {
            "name": "Medrive",
            "skills": [
                {
                    "value": "Android Development"
                },
                {
                    "value": "Google Vision API"
                },
                {
                    "value": "OCR"
                },
                {
                    "value": "Team Leadership"
                }
            ],
            "start_date": "May 2019",
            "end_date": "Dec 2022",
            "description": [
                {
                    "value": "Developed a mobile app for storing medical records online, with an OCR feature to transcribe prescriptions."
                },
                {
                    "value": "Led a team to drive the initiative, resulting in over 200 downloads and recognition in entrepreneurship competitions."
                }
            ]
        }
    ]
}

  return <div>
    <span>Testing components here temporarily</span>
    {/* <VerifyProjects finalData={resume} onNext={null} setFinalData={null}/> */}
  </div>
}