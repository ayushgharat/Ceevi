import ProfileComponent from "~components/website/profile-page"
import { createClient } from "~utils/supabase/server"

//const router = useRouter()

async function loadProfile() {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (user) {
      const response = await fetch(`${process.env.DOMAIN}api/db/get-user-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: user.id })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        const data = await response.json()
        //console.log(data)
          return {profile: data, id: user.id}
        
        
        
      }
    }
  } catch (error) {
    console.error("Error creating user:", error)
  }
}

const Profile = async () => {

  const response = await loadProfile()
  const profile = response?.profile
  const id = response?.id

  

  return (
    <div className="flex flex-col items-center h-screen">
      {<ProfileComponent profile={profile} id={id} />}
    </div>
  )
}

export default Profile
