'use server'
import { redirect } from "next/navigation"
import { getUserProfile } from "~app/action"
import ProfileComponent from "~components/website/profile-page"
import { createClient } from "~utils/supabase/server"

//const router = useRouter()

async function loadProfile() {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/authenticate/login')
  }

  
  try {
  
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (user) {
      // console.log(process.env.NEXT_PUBLIC_DOMAIN)
      // const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/db/get-user-profile`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ id: user.id })
      // })
      // if (!response.ok) {
      //   const message = await response.json()
      //   console.log(message)
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // } else {
      //   const data = await response.json()
      //   //console.log(data)
      //    return {profile: data, id: user.id}
      
      // }
      const {profile} = await getUserProfile(user.id)
      if (!profile) {
        redirect('/dashboard/profile/edit-profile')
      }
      return {profile: profile, id: user.id}
    }

    
  } catch (error) {
    console.error("Error creating user:", error)
  }
}

const Profile = async () => {

  const response = await loadProfile()
  const profile = response?.profile ?? null
  const id = response?.id


  return (
    <div className="flex flex-col items-center h-screen">
      {profile ? <ProfileComponent profile={profile} id={id} /> : <span>Unable to load profile</span>}
    </div>
  )
}

export default Profile
