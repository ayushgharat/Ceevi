import { NextRequest, NextResponse } from "next/server"


import {createClient} from "~/utils/supabase/server"

export async function GET(req: NextRequest, res: NextResponse) {
    const supabase = await createClient()
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
