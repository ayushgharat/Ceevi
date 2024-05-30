import type { NextApiRequest, NextApiResponse } from 'next'

import createClient from '~/utils/supabase/api'

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).appendHeader('Allow', 'GET').end()
    return
  }

//   const queryParams = req.query
//   const token_hash = stringOrFirstString(queryParams.token_hash)
//   const type = stringOrFirstString(queryParams.type)


//   if (token_hash && type) {
    const supabase = createClient(req, res)
    const { data: {user}, error } = await supabase.auth.getUser()
    if (error) {
      console.error(error)
    } else {
      //console.log(user)
      res.status(200).json({user: user})
    }
//   }


  //TODO: Reconfigure status code

  res.status(200).json({error: "Error"})
  //res.status(200).end("This is the user")
}