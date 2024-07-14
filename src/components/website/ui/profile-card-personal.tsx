import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Pencil1Icon } from "@radix-ui/react-icons"

import { ProfileDialogPersonal } from "./profile-dialog-personal"

const ProfileCardPersonal = ({ profile, updateProfile }) => {
  const personal = profile.personal

  const updatePersonal = (newPersonal) => {
    const newProfile = {
      ...profile,
      personal: newPersonal
    }

    updateProfile(newProfile)
  }

  return (
    <Card className="w-full">
      <CardContent className="flex flex-row">
        {/* <ProfileDialogPersonal personal={personal} updatePersonal={updatePersonal}/> */}
        <div className="grid grid-cols-2 w-full font-dmsans ps-6 gap-y-10">
          <div className="flex flex-col">
            <span className="opacity-50">First Name</span>
            <span>{personal.first_name}</span>
          </div>

          <div className="flex flex-col">
            <span className="opacity-50">Last Name</span>
            <span>{personal.last_name}</span>
          </div>

          <div className="flex flex-col">
            <span className="opacity-50">Phone Number</span>
            <span>{personal.phone_number}</span>
          </div>

          <div className="flex flex-col">
            <span className="opacity-50">Email</span>
            <span>{personal.email}</span>
          </div>

          <div className="flex flex-col col-span-2">
            <span className="opacity-50">LinkedIn</span>
            <span>{personal.linkedin}</span>
          </div>

          <div className="flex flex-col col-span-2">
            <span className="opacity-50">Github</span>
            <span>{personal.github}</span>
          </div>

          <div className="flex flex-col col-span-2">
            <span className="opacity-50">Portfolio</span>
            <span>{personal.portfolio}</span>
          </div>
        </div>
        <ProfileDialogPersonal
          personal={personal}
          updatePersonal={updatePersonal}
        />
      </CardContent>
    </Card>
  )
}

export default ProfileCardPersonal
