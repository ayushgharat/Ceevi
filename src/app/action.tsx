"use server"

import { readFileSync, writeFileSync } from "fs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import ResumeParser from "resume-parser"
import OpenAI from "openai"

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

import { createClient } from "~utils/supabase/server"
import { openai_generated_resume_structure } from "~types"

export async function login(email: string, password: string) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      message: error.message
    }
  }

  console.log("User has logged in")

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(email, password, firstName, lastName) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: `${firstName} ${lastName}`,
        profile_created: false,
      }
    }
  })

  if (error) {
    return {
      message: error.message
    }
  } else {
    if (user) 
      try {
        const response = await fetch("/api/db/new-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user })
        })
    
        if (!response.ok) {
          return {
            message: JSON.stringify(response.json())
          }
        } else {
          redirect("/dashboard")
        }
      } catch (error) {
        console.error("Error creating user:", error)
      }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}


export async function checkIfUserIsLoggedIn() {
  const supabase = createClient()
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    return { error }
  }

  return { user }
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/callback`
    }
  })

  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/authneticate/login")
}

export async function getUserProfile(id) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select("profile")
    .eq("id", id)

  if (error) {
    return { error: error }
  }

  return { profile: data[0].profile }
}

// export async function generateNewResume(job_info, profile, userPref) {
//   const experience_structure = {
//     experience: [
//       {
//         company: "",
//         role: "",
//         start_date: "",
//         end_date: "",
//         location: "",
//         description: [{ value: "" }]
//       }
//     ],
//     project: [
//       {
//         name: "",
//         skills: [{ value: "" }],
//         start_date: "",
//         end_date: "",
//         description: [{ value: "" }]
//       }
//     ],
//     skill: {
//       languages: [""],
//       technologies: [""]
//     }
//   }

//   // const data = await req.json()
//   // //const { user } = req.body

//   // const { job_info, profile, userPref } = data

//   //console.log(profile.data[0].profile.professional.experience)

//   const prompt = `You are responsible for building custom resumes that are tailored to a job posting. You will be given a job posting and the user information, and your goal is to strictly use only the sections of the user information most relevant to the job posting to build the best resume possible that will pass ATS. Ensure that you strictly follow this structure: ${JSON.stringify(experience_structure)}

// Style: Focus on highlighting impact, ensuring that every description has at least one statistic. Use as many technical keywords from the user information as possible that are relevant to the job posting. Provide 2-3 lines of description for each experience and project. Each description should be strictly around 110 characters long, and Start bullet points with strong action verbs like "Led", "Developed", "Implemented", "Managed", etc. Use numbers to quantify accomplishments and mention any relevant certifications or awards that can set the user apart. You must strictly use only the structure provided to you when building the resume, and if you do not you must end the json packet with an attribute structure:false. For the skills section, write all the skills mentioned in the previous experiences and projects. Only provide the JSON as the output.`
//   const message = [
//     { role: "system", content: prompt },
//     {
//       role: "user",
//       content:
//         "Use the following user information to build the resume: " +
//         JSON.stringify(profile.data[0].profile.professional) +
//         " and use the following job posting as reference to customize the resume: " +
//         job_info + ". Include the following requests made by the user: " + userPref
//     }
//   ]
//   const response = await generateText(message)
//   console.log(response)
//   console.log(response.message.content!)
//   return Response.json(JSON.parse(response.message.content!))
// }

// async function generateText(message) {
//   const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY })
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo-1106",
//     response_format: { type: "json_object" },
//     messages: message
//   })
//   console.log(response.usage?.total_tokens)
//   return response.choices[0]
// }



export async function generateNewResume(jobInfo: string, professional_data: any, userPref: string) {
  'use server';

  const stream = createStreamableValue();
  // console.log(id)

  // const current_profile = await getUserProfile(id)
  // console.log(current_profile)

  const system = `You are responsible for building custom resumes that are tailored to a job posting. You will be given a job posting and the user information, and your goal is to strictly use only the sections of the user information most relevant to the job posting to build the best resume possible that will pass ATS. Style: Focus on highlighting impact, ensuring that every description has at least one statistic. Use as many technical keywords from the user information as possible that are relevant to the job posting. Provide 2-3 lines of description for each experience and project. Each description should be strictly around 110 characters long, and Start bullet points with strong action verbs like "Led", "Developed", "Implemented", "Managed", etc. Use numbers to quantify accomplishments and mention any relevant certifications or awards that can set the user apart. For the skills section, write all the skills mentioned in the previous experiences and projects.`;

  const input = "Use the following user information to build the resume: " + JSON.stringify(professional_data) +
         " and use the following job posting as reference to customize the resume: " +
         jobInfo + ". Include the following requests made by the user: " + userPref;

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-3.5-turbo-1106"),
      system: system,
      prompt: input,
      schema: openai_generated_resume_structure,
      onFinish({ object, error }) {
        // handle type validation failure (when the object does not match the schema):
        if (object === undefined) {
          console.error('Error:', error);
          return;
        }
    
        console.log('Final object:', JSON.stringify(object, null, 2));
      },
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}

