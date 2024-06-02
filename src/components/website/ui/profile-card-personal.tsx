import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { ProfileDialogPersonal } from "./profile-dialog-name"

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
    <Card className="border-2 p-3 border-purple-500 rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Personal Information</CardTitle>
        <ProfileDialogPersonal personal={personal} updatePersonal={updatePersonal}/>
      </CardHeader>
      <CardContent className="">
        <p>{personal.first_name} {personal.last_name}</p>
        <p>{personal.email}</p>
        <p>{personal.phone_number}</p>
        <p>{personal.linkedin}</p>
        <p>{personal.github}</p>
      </CardContent>
    </Card>
  )
}

export default ProfileCardPersonal
