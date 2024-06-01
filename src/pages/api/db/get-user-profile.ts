import type { NextApiRequest, NextApiResponse } from "next"

import createClient from "~/utils/supabase/api"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { user } = req.body

  const supabase = createClient(req, res)
  const { data, error } = await supabase
    .from("users")
    .select('profile').eq('id', user.id)

  if (error) {
    console.log(error)
    res.status(500).json({ error:error })
  }

  const profile = data[0]

  res.status(200).json({ profile })
  //res.status(200).end("This is the user")
}
