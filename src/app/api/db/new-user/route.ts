import type { NextApiRequest, NextApiResponse } from "next"

import createClient from "~/utils/supabase/api"

export async function POST(req, res) {
  //const { user } = await req.json().body
  const packet = await req.json()
  const user = packet.user

  const supabase = createClient(req, res)

  console.log(user)
  const { error } = await supabase
    .from("users")
    .insert({
      id: user.id,
      created_at: user.created_at,
      user_info: user,
      email: user.email
    })

  if (error) {
    console.log(error)
    return Response.json({ error: error })
  }

  return Response.json({ message: "Success" })
  //res.status(200).end("This is the user")

}
