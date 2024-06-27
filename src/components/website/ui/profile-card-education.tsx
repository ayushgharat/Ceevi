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
import { ProfileDialogNewEducation } from "./profile-dialog-new-education"
import { ProfileDialogPersonal } from "./profile-dialog-personal"
import { convertDate } from "~utils/helper/helper"

const ProfileCardEducation = ({ profile, updateProfile }) => {
  const education = profile.education
  console.log(education)
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
    <Card className="w-full">
      <CardContent className="flex flex-col justify-between h-full">
        {/* <ProfileDialogPersonal personal={personal} updatePersonal={updatePersonal}/> */}
        <div className="flex flex-col w-full font-dmsans px-6 gap-y-5">
          {education.map((item, index) => {
            return (
              <div
                key={item.name}
                className="flex flex-col pb-2 border-b-[1px] border-black border-opacity-20">
                <div className="flex flex-row justify-between">
                  <span className="font-medium text-lg">{item.name}</span>
                  <div className="flex flex-row items-center">
                    <span className="font-medium text-lg">{item.location}</span>

                    <ProfileDialogEducation
                      education={item}
                      index={index}
                      updateEducation={updateEducation}
                      deleteEducation={deleteEducation}
                    />
                  </div>
                </div>
                <span className="font-light text-lg">
                  {convertDate(item.start_date)} - {convertDate(item.end_date)}
                </span>
                <span>
                  {item.degree_level} degree in {item.major}
                </span>
              </div>
            )
          })}
        </div>
        <ProfileDialogNewEducation addNewEducation={addNewEducation} />
      </CardContent>
    </Card>
  )
}

export default ProfileCardEducation
