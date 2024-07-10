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
import { ProfileDialogPersonal } from "./profile-dialog-personal"
import { ProfileDialogNewEducation } from "./profile-dialog-new-education"
import { ProfileDialogProject } from "./profile-dialog-project"
import { ProfileDialogNewProject } from "./profile-dialog-new-project"

const ProfileCardProject = ({ profile, updateProfile }) => {
  const project = profile.professional.project

  
  const updateProject = (newProject, index) => {
    const newProfile = {
      ...profile,
      professional: {
        project: profile.professional.project.map((item, i) =>
          i === index ? newProject : item
        ),
        experience: profile.professional.experience
      }
    }

    //console.log(newProfile)
    updateProfile(newProfile)
  }

  const addNewProject = (newProject) => {
    const newProfile = {
      ...profile,
      professional: {
        project: [newProject, ...profile.professional.project],
        experience: profile.professional.experience
      }
    }
    updateProfile(newProfile)
  }

  const deleteProject = (index) => {
    const newProfile = {
      ...profile,
      professional: {
        project: [
          ...profile.professional.project.slice(0, index),
          ...profile.professional.project.slice(index + 1)
        ],
        experience: profile.professional.experience
      }
    }
    updateProfile(newProfile)
  }

  return (
    <Card className="w-full flex flex-col justify-between gap-y-5">
      <CardContent className="flex flex-col w-full font-dmsans px-6 gap-y-8 overflow-y-scroll">
        {/* <ProfileDialogPersonal personal={personal} updatePersonal={updatePersonal}/> */}

        {project.map((item, index) => {
          return (
            <div
              key={item.name}
              className="flex flex-col pb-5 border-b-[1px] border-black border-opacity-20">
              <div className="flex flex-row justify-between gap-x-4">
                <span className="font-medium text-lg">{item.name}</span>

                <ProfileDialogProject
                  project={item}
                  index={index}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                />
              </div>
              <span className="font-light text-lg">
                {convertDate(item.start_date)}
              </span>

              <span className="font-light text-sm">{item.description}</span>
            </div>
          )
        })}
      </CardContent>

      <ProfileDialogNewProject addNewProject={addNewProject} />
    </Card>
  )
}

export default ProfileCardProject
