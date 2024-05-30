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

  const { user } = req.body
  //console.log(user)

  const supabase = createClient(req, res)

  console.log(user)
  const { error } = await supabase
    .from("users")
    .insert({ id: user.id, created_at: user.created_at, user_info: user, email: user.email })

  if (error) {
    console.log(error)
    res.status(500).json({ error:error })
  }

  res.status(200).json({ message: "Success" })
  //res.status(200).end("This is the user")
}
