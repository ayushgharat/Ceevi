import type { NextApiRequest, NextApiResponse } from "next"

import createClient from "~/utils/supabase/api"

export async function POST(req, res) {
  //const { user } = await req.json().body
  const packet = await req.json()
  const user = packet.user

  const supabase = createClient(req, res)
  const { data, error } = await supabase
    .from("users")
    .select('profile').eq('id', user.id)

  if (error) {
    console.log(error)
    return Response.json({ error:error })
  }

  if(data) {
    const profile = data[0]
    return Response.json({ profile })
  }

  
  //res.status(200).end("This is the user")
}
