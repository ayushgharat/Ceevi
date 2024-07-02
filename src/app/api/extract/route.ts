import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY })

export const maxDuration = 40

async function generateText(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: message
  })

  return response.choices[0]
}

const resume_structure = {
  personal: {
    first_name: "",
    last_name: "",
    phone_number: "",
    github: "",
    linkedin: ""
  },
  education: [
    {
      name: "",
      major: "",
      start_date: "",
      end_date: "",
      degree_level: ""
    }
  ],
  professional: {
    experience: [
      {
        company: "",
        role: "",
        start_date: "",
        end_date: "",
        location: "",
        description: ""
      }
    ],
    project: [
      {
        name: "",
        skills: "",
        start_date: "",
        end_date: "",
        description: ""
      }
    ],
    skill: {
      languages: [""],
      technologies: [""]
    }
  }
}

export async function POST(req, res) {
  const data = await req.json()
  const { user_info } = data

  //console.log(profile.data[0].profile.professional.experience)

  const prompt = `You are responsible for extracting information from the user's input, and filling the following JSON template: ${JSON.stringify(resume_structure)}. Convert all dates consisting of month and year to the following format: YYYY-MM, unless the date says Present, where you add the value of Present. Use as much of the user's information as possible, and leave all the other fields blank. Return only the JSON template populated with the user's information.`
  const message = [
    { role: "system", content: prompt },
    {
      role: "user",
      content:
        "Use the following user information to populate the template: " +
        JSON.stringify(user_info)
    }
  ]
  const response = await generateText(message)
  return Response.json(JSON.parse(response.message.content!))
}
