import type { NextApiRequest, NextApiResponse } from "next"

import {createClient} from "~/utils/supabase/server"

export async function POST(req, res) {
  //const { user } = await req.json().body
  const packet = await req.json()
  const id = packet.id

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select('profile').eq('id', id)

  if (error) {
    return Response.json({ error:error })
  }

  if(data) {
    const profile = data[0].profile
    return Response.json({ profile: profile })
  }

  
  //res.status(200).end("This is the user")
}
