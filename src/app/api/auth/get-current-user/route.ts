import type { NextApiRequest, NextApiResponse } from "next"

import createClient from "~/utils/supabase/api"

export async function GET(req, res) {
    const supabase = createClient(req, res)
    const { data: {user}, error } = await supabase.auth.getUser()
    if (error) {
      console.error(error)
    } else {
      //console.log(user)
      return Response.json({user: user})
    }
//   }


  //TODO: Reconfigure status code

  return Response.json({error: "Error"})
  //res.status(200).end("This is the user")
}
