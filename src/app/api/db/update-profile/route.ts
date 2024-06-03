import createClient from "~/utils/supabase/api"

export async function POST(req, res) {
  //const { user } = await req.json().body
  const packet = await req.json()
  const { profile, id } = packet
  //console.log(user)

  const supabase = createClient(req, res)

  const { error } = await supabase
    .from("users")
    .update({ profile: profile })
    .eq("id", id)

  if (error) {
    console.log(error)
    return Response.json({ error: error })
  }

  return Response.json({ message: "Success" })
  //res.status(200).end("This is the user")
}
