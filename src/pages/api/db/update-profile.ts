import type { NextApiRequest, NextApiResponse } from "next"

import createClient from "~/utils/supabase/api"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
//   if (req.method !== "POST") {
//     res.status(405).appendHeader("Allow", "GET").end()
//     return
//   }

  const { profile, id } = req.body
  //console.log(user)

  const supabase = createClient(req, res)

  const { error } = await supabase
    .from("users")
    .update({profile: profile})
    .eq('id', id)

  if (error) {
    console.log(error)
    res.status(500).json({ error:error })
  }

  res.status(200).json({ message: "Success" })
  //res.status(200).end("This is the user")
}
