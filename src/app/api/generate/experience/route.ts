import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY })

async function generateText(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: message
  })

  return response.choices[0]
}

export async function POST(req, res) {
  const experience_structure = {
    experience: [
      {
        company: "",
        role: "",
        start_date: "",
        end_date: "",
        location: "",
        description: [{ value: "" }]
      }
    ]
  }

  const data = await req.json()
  //const { user } = req.body

  const { job_info, profile } = data

  console.log(profile.data[0].profile.professional.experience)

  const prompt =
    "You are tasked with crafting custom resumes tailored to specific job postings strictly using only the user information provided to you. Output Format: Generate the resume section as JSON data. You must include relevant technical keywords in the descriptions for each item under that section. The resume should feature a minimum of 2 to 3 experiences, strictly based on the user information and nothing else. DO not include any other details. Choose locations (physical or “Remote”) based on user input. You must include all the technical skills initially given by the user as the first priority. Description: Focus on technical detail and relevance, strictly avoiding any fluff. Each sentence can be 120 characters maximum and there must be about 3 detailed sentences in the description. Example Output Structure: " +
    JSON.stringify(experience_structure) +
    ". Ensure that priority is given to experiences that match those listed in the job posting. Only output the JSON for this section."
  const message = [
    { role: "system", content: prompt },
    {
      role: "user",
      content:
        "Use the following user information to build the resume: " +
        JSON.stringify(profile.data[0].profile.professional.experience) +
        " and use the following job posting as reference to customize the resume: " +
        job_info
    }
  ]
  const response = await generateText(message)
  console.log(message)
  // res.status(200).json({ response })
  // res.setHeader("Content-Type", "application/json")

  // return Response.json(
  //   JSON.stringify({
  //     experience: [
  //       {
  //         Company_Name: "KFin Technologies Ltd.",
  //         Location: "Mumbai, Maharashtra, India",
  //         Position_Title: "Software Engineer Intern",
  //         Start_Date: "May 2023",
  //         End_Date: "Present",
  //         Description:
  //           "Implemented Google Cloud OAuth 2.0 server on AWS ECS for ML life cycle management. Analyzed security flaws in Basic HTTP Auth, deployed platform versions via Terraform stacks on AWS (S3, RDS, Route 53, Secrets Manager). Developed Python scripts for tracking Mutual Fund Scheme data using Selenium, BeautifulSoup, Pandas, AWS Athena. Utilized NLTK, spaCy, Scikit-Learn for custom Vector Comparison method. Scheduled AWS Lambda Functions to query AMFI data and alert anomalies to project teams via SNS."
  //       },
  //       {
  //         Company_Name: "Carnegie Mellon University",
  //         Location: "Pennsylvania, United States (Remote)",
  //         Position_Title: "Machine Learning Research Intern",
  //         Start_Date: "Aug 2021",
  //         End_Date: "Jan 2022",
  //         Description:
  //           "Conceptualized mobile system for 3D face reconstruction. Trained GAN in PyTorch using Scikit-Learn, Numpy, OpenCV. Extracted 68 facial landmarks with DLib mapping onto 3D FLAME model with SciPy, PyMesh, Matplotlib."
  //       },
  //       {
  //         Company_Name: "Talerang",
  //         Location: "Mumbai, Maharashtra, India",
  //         Position_Title: "Software Engineer Intern",
  //         Start_Date: "Aug 2020",
  //         End_Date: "Dec 2020",
  //         Description:
  //           "Developed Corporate Portal for Talerang using JavaScript, HTML, CSS, PHP, SQL. Architected Real-Time Video Translation Tool in Python with AWS Translate for NLP."
  //       }
  //     ]
  //   })
  // )

  return Response.json(JSON.parse(response.message.content!))
}
