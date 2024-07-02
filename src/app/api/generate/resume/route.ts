import { OpenAIStream, StreamingTextResponse, streamObject } from "ai";
//import OpenAI from "openai"
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { openai_generated_resume_structure } from "~types";

//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function generateText(message) {
  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo-1106",
  //   response_format: { type: "json_object" },
  //   stream: true,
  //   messages: message
  // })
  // //const stream = OpenAIStream(response);
  // return response;

//   for await (const chunk of response) {
//     console.log(chunk.choices[0]?.delta?.content || "");
// }
  //console.log(response.usage?.total_tokens)
  //return response.choices[0]

  const { partialObjectStream, textStream } = await streamObject({
    model: openai('gpt-3.5-turbo-1106'),
    mode:'json',
    schema:openai_generated_resume_structure,
    prompt: message,
  });

  return partialObjectStream

}

export async function POST(req, res) {
  const resume_structure = {
    experience: [
      {
        company: "",
        role: "",
        start_date: "",
        end_date: "",
        location: "",
        description: [{ value: "" }]
      }
    ],
    project: [
      {
        name: "",
        skills: [{ value: "" }],
        start_date: "",
        end_date: "",
        description: [{ value: "" }]
      }
    ],
    skill: {
      languages: [""],
      technologies: [""]
    }
  }

  const data = await req.json()
  //const { user } = req.body

  const { job_info, profile, userPref } = data

  //console.log(profile.data[0].profile.professional.experience)

//   const prompt = `You are responsible for building custom resumes that are tailored to a job posting. You will be given a job posting and the user information, and your goal is to strictly use only the sections of the user information most relevant to the job posting to build the best resume possible that will pass ATS. Ensure that you strictly follow this structure: ${JSON.stringify(experience_structure)}

// Style: Focus on highlighting impact, ensuring that every description has at least one statistic. Use as many technical keywords from the user information as possible that are relevant to the job posting. Provide 2-3 lines of description for each experience and project. Each description should be strictly around 110 characters long, and Start bullet points with strong action verbs like "Led", "Developed", "Implemented", "Managed", etc. Use numbers to quantify accomplishments and mention any relevant certifications or awards that can set the user apart. You must strictly use only the structure provided to you when building the resume. For the skills section, write all the skills mentioned in the previous experiences and projects. Only provide the JSON as the output.`
  

const prompt = `Build a custom resume tailored to the job posting using only relevant user information. Style: Highlight impact with statistics. Use relevant technical keywords. Provide 2-3 lines per experience/project, each around 110 characters. Start bullet points with strong action verbs (e.g., "Led," "Developed"). Quantify accomplishments. Mention relevant certifications/awards. Output only JSON.`
const message = [
    { role: "system", content: prompt },
    {
      role: "user",
      content:
        "Use the following user information to build the resume: " +
        JSON.stringify(profile.data[0].profile.professional) +
        " and use the following job posting as reference to customize the resume: " +
        job_info + ". Include the following requests made by the user: " + userPref
    }
  ]

  //console.log(prompt)
  
  //const response = await generateText(message)
  

  //return response;
  return generateText(message)
  // console.log(response)
  // console.log(response.message.content!)
  // return Response.json(JSON.parse(response.message.content!))


}
