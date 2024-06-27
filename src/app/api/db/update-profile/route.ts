import {createClient} from "~/utils/supabase/server"

export async function POST(req, res) {
  try {
    //const { user } = await req.json().body
  const packet = await req.json()
  const { profile, id } = packet
  //console.log(user)

  const supabase = await createClient()

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
  } catch (err) {
    return;
  }
}
