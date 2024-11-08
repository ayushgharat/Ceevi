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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons"
import React from "react"
import { useState, type ChangeEvent } from "react"

interface ProfileDialogProjectProps {
  project: {
    name: string
    skills: string
    start_date: string
    description: string
  }
  index: number
  updateProject: (project: ProfileDialogProjectProps["project"], index: number) => void
  deleteProject: (index: number) => void
}

export function ProfileDialogProject({ project, index, updateProject, deleteProject }: ProfileDialogProjectProps) {
  if (!project || typeof index === 'undefined' || !updateProject || !deleteProject) {
    console.error("ProfileDialogProject: Missing required props.")
    return null
  }

  const [newProject, setNewProject] = useState(project)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const handleSaveChanges = () => {
    if (validateInputs()) {
      updateProject(
        { ...newProject },
        index
      )
      setOpen(false)
    } 
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target
    setNewProject((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const requiredFields = [
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-xl font-dmsans flex flex-col p-3 gap-y-3 shadow-lg">
          <DropdownMenuItem>
            <button onClick={() => setOpen(true)}>Edit</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={() => deleteProject(index)}>Delete</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[40px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-scroll">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Edit project</DialogTitle>
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
