import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"

import { ProfileDialogEducation } from "./profile-dialog-education"
import { ProfileDialogPersonal } from "./profile-dialog-name"
import { ProfileDialogNewEducation } from "./profile-dialog-new-education"

const ProfileCardEducation = ({ profile, updateProfile }) => {
  const updateEducation = (newEducation, index) => {
    const newProfile = {
      ...profile,
      education: profile.education.map((item, i) =>
        i === index ? newEducation : item
      )
    }

    updateProfile(newProfile)
  }

  const addNewEducation = (newEducation) => {
    const newProfile = {
      ...profile,
      education: [newEducation, ...profile.education]
    }

    //console.log(newProfile)
    updateProfile(newProfile)
  }

  const deleteEducation = (index) => {
    const newProfile = {
      ...profile,
      education: [
        ...profile.education.slice(0, index),
        ...profile.education.slice(index + 1)
      ]
    }
    updateProfile(newProfile)
  }

  return (
    <Card className="border-2 p-3 border-purple-500 rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Education</CardTitle>
        <ProfileDialogNewEducation addNewEducation={addNewEducation} />
      </CardHeader>
      <CardContent className="">
        {profile.education.map((item, index) => {
          return (
            <div key={index} className="flex flex-col shadow-md px-1 py-2">
              <div className="flex flex-row justify-between">
                <span className="text-xl">{item.name}</span>
                <div className="flex flex-row">
                  <ProfileDialogEducation
                    education={item}
                    index={index}
                    updateEducation={updateEducation}
                  />
                  <Button onClick={(e) => deleteEducation(index)}>
                    <TrashIcon />
                  </Button>
                </div>
              </div>
              <span className="mt-2">{item.location}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ProfileCardEducation
