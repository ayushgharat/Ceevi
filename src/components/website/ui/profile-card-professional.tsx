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

import { ProfileDialogExperience } from "./profile-dialog-experience"
import { ProfileDialogNewExperience } from "./profile-dialog-new-experience"
import { ProfileDialogNewProject } from "./profile-dialog-new-project"
import { ProfileDialogProject } from "./profile-dialog-project"

const ProfileCardProfessional = ({ profile, updateProfile }) => {
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
    //console.log(newProfile)
    updateProfile(newProfile)
  }

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
    <Card className="border-2 p-3 border-purple-500 rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Professional</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div>
          <div className="flex flex-row justify-between">
            <span>Experiences</span>
            <ProfileDialogNewExperience addNewExperience={addNewExperience} />
          </div>
          {profile.professional.experience.map((item, index) => {
            return (
              <div className="flex flex-col shadow-md px-1 py-2">
                <div className="flex flex-row justify-between">
                  <span className="text-xl">{item.company}</span>
                  <div>
                    <ProfileDialogExperience
                      experience={item}
                      index={index}
                      updateExperience={updateExperience}
                    />
                    <Button onClick={() => deleteExperience(index)}>
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
                <span className="mt-2">{item.location}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-4">
          <div className="flex flex-row justify-between">
            <span>Projects</span>
            <ProfileDialogNewProject addNewProject={addNewProject} />
          </div>
          {profile.professional.project.map((item, index) => {
            return (
              <div className="flex flex-col shadow-md px-1 py-2">
                <div className="flex flex-row justify-between">
                  <span className="text-xl">{item.name}</span>
                  <div className="flex flex-row">
                    <ProfileDialogProject
                      project={item}
                      index={index}
                      updateProject={updateProject}
                    />
                    <Button onClick={() => deleteProject(index)}>
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
                {/* <span className="mt-2">{item}</span> */}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCardProfessional
