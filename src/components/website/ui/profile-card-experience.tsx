import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"

import { convertDate } from "~utils/helper/helper"

import { ProfileDialogEducation } from "./profile-dialog-education"
import { ProfileDialogExperience } from "./profile-dialog-experience"
import { ProfileDialogNewEducation } from "./profile-dialog-new-education"
import { ProfileDialogNewExperience } from "./profile-dialog-new-experience"
import { ProfileDialogPersonal } from "./profile-dialog-personal"

const ProfileCardExperience = ({ profile, updateProfile }) => {
  const experience = profile.professional.experience

  const updateExperience = (newExperience, index) => {
    const newProfile = {
      ...profile,
      professional: {
        experience: profile.professional.experience.map((item, i) =>
          i === index ? newExperience : item
        ),
        project: profile.professional.project
      }
    }
    updateProfile(newProfile)
  }

  const addNewExperience = (newExperience) => {
    const newProfile = {
      ...profile,
      professional: {
        experience: [newExperience, ...profile.professional.experience],
        project: profile.professional.project
      }
    }
    updateProfile(newProfile)
  }

  const deleteExperience = (index) => {
    const newProfile = {
      ...profile,
      professional: {
        experience: [
          ...profile.professional.experience.slice(0, index),
          ...profile.professional.experience.slice(index + 1)
        ],
        project: profile.professional.project
      }
    }
    updateProfile(newProfile)
  }

  return (
    <Card className="w-full flex flex-col justify-between gap-y-10">
      <CardContent className="overflow-y-scroll">
        {/* <ProfileDialogPersonal personal={personal} updatePersonal={updatePersonal}/> */}

        <div className="flex flex-col w-full font-dmsans px-6 gap-y-8 ">
          {experience.map((item, index) => {
            return (
              <div
                key={item.company}
                className="flex flex-col pb-5 border-b-[1px] border-black border-opacity-20">
                <div className="flex flex-row justify-between gap-x-4">
                  <span className="font-medium text-lg">
                    {item.role} - {item.company}
                  </span>
                  <div className="flex flex-row items-center">
                    <span className="font-medium text-lg me-3">
                      {item.location}
                    </span>
                    <ProfileDialogExperience
                      experience={item}
                      index={index}
                      updateExperience={updateExperience}
                      deleteExperience={deleteExperience}
                    />
                  </div>
                </div>
                <span className="font-light text-lg">
                  {convertDate(item.start_date)} - {convertDate(item.end_date)}
                </span>

                <span className="font-light text-sm">{item.description}</span>
              </div>
            )
          })}
        </div>
      </CardContent>

      <ProfileDialogNewExperience addNewExperience={addNewExperience} />
    </Card>
  )
}

export default ProfileCardExperience
