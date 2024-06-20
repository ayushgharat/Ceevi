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
      const response = await fetch("http://localhost:1947/api/db/get-user-profile", {
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
  const updateProfile = async (newProfile) => {
    // try {
    //   const response = await fetch("/api/db/update-profile", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ id: userdata.id, profile: newProfile })
    //   })
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`)
    //   } else {
    //     const data = await response.json()
    //     console.log(data)
    //     console.log("Name updated successfully")
    //     setProfile(newProfile)
    //   }
    // } catch (error) {
    //   console.error("Error creating user:", error)
    // }
  }

  const response = await loadProfile()
  const profile = response?.profile
  const id = response?.id

  return (
    // <div id="header" className="flex flex-row w-full h-screen">
    //   {/* {menu} */}
    //   <CustomSidebar />

    //   <div className="bg-gradient-to-br from-vivid_violet to-electric_indigo w-full flex flex-col p-2 h-full">
    //     <span className="ms-10 my-5 w-fit font-poppins font-semibold text-2xl text-white">
    //       Edit your profile
    //     </span>
    //     <div className="bg-white h-full relative w-full rounded-3xl p-8 flex flex-row">
    //       <div className="flex flex-col w-1/4 border-r-[1px] h-full ms-5 font-dmsans text-lg font-medium gap-y-5">
    //         <button
    //           className="text-left"
    //           onClick={(e) => setComponentToRender("Personal")}>
    //           Personal
    //         </button>
    //         <button
    //           className="text-left"
    //           onClick={() => setComponentToRender("Education")}>
    //           Education
    //         </button>
    //         <button className="text-left">Experiences</button>
    //         <button className="text-left">Projects</button>
    //       </div>

    //       {renderComponent()}
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center h-screen">
      {<ProfileComponent profile={profile} id={id} />}
    </div>
  )
}

export default Profile
