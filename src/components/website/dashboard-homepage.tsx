import { useRouter } from "next/router"
import { useState } from "react"

export function DashboardHomePage({ user, signOut }) {
  const [data, setData] = useState("")
  const router = useRouter();

  function completeProfile() {
    router.push("/dashboard/profile/edit-profile")
  }
  

  return (
    <div className="flex flex-col items-center">
      <span>Welcome to my dashboard</span>

      {user && !user.profile && <button onClick={completeProfile}>Complete your profile</button>}

      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
