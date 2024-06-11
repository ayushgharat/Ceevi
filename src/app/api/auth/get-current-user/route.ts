import type { NextApiRequest, NextApiResponse } from "next"

import {createClient} from "~/utils/supabase/server"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient()
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
