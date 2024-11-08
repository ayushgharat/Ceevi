import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Cross2Icon } from "@radix-ui/react-icons"
import React from "react"
import { useState, type ChangeEvent } from "react"

import type { ProjectItem } from "~types"

interface ProfileDialogNewProjectProps {
  addNewProject: (project: ProjectItem) => void
}

export function ProfileDialogNewProject({ addNewProject }: ProfileDialogNewProjectProps) {
  if (!addNewProject) {
    console.error("ProfileDialogNewProject: Missing required prop addNewProject.")
    return null
  }

  const [newProject, setNewProject] = useState<ProjectItem>({
    name: "",
    skills: "",
    start_date: "",
    description: ""
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isPresent, setIsPresent] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSaveChanges = () => {
    if (validateInputs()) {
      addNewProject({
        ...newProject,
        
      })
      setOpen(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event && event.target) {
      const { id, value } = event.target
      setNewProject((prevState) => ({
        ...prevState,
        [id]: value
      }))
    }
  }


  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const requiredFields: (keyof ProjectItem)[] = [
      "name",
      "skills",
      "start_date",
      "description"
    ]

    requiredFields.forEach((field) => {
      if (!newProject[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button className="PrimaryButton" onClick={() => setOpen(true)}>Add New Project</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[40px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-scroll">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Add new project</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="DialogLayout">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newProject.name || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>

            <div className="DialogLayout">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                value={newProject.skills || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.skills && <span className="text-red-500">{errors.skills}</span>}
            </div>

            <div className="DialogLayout">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="start_date"
                value={newProject.start_date || ""}
                className="DialogInput flex-col justify-between"
                onChange={handleInputChange}
                type="month"
              />
              {errors.start_date && <span className="text-red-500">{errors.start_date}</span>}
            </div>
            

            <div className="DialogLayout col-span-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newProject.description || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.description && <span className="text-red-500">{errors.description}</span>}
            </div>
          </div>
          <DialogClose asChild>
            <button
              className="text-violet11 focus:shadow-violet7 absolute top-[20px] right-[20px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <Cross2Icon color="#000" />
            </button>
          </DialogClose>
          <DialogFooter>
            <Button
              className="PrimaryButton"
              type="submit"
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
