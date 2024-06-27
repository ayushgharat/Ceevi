import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Cross2Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

import type { ProjectItem } from "~types"

export function ProfileDialogNewProject({ addNewProject }) {
  const [newProject, setNewProject] = useState<ProjectItem>({
    name: "",
    skills: "",
    start_date: "",
    end_date: "",
    description: ""
  })
  const [isPresent, setIsPresent] = useState(false)

  const handleSaveChanges = () => {
    addNewProject({
      ...newProject,
      end_date: isPresent ? "Present" : newProject.end_date
    })
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setNewProject((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handlePresentChange = () => {
    setIsPresent(!isPresent)
    setNewProject((prevState) => ({
      ...prevState,
      end_date: isPresent ? "" : "Present"
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="PrimaryButton">Add New Project</button>
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
                value={newProject.name}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>

            <div className="DialogLayout">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                value={newProject.skills}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>

            <div className="DialogLayout">
              <Label htmlFor="start_date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start_date"
                value={newProject.start_date}
                className="DialogInput flex-col justify-between"
                onChange={handleInputChange}
                type="month"
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              {!isPresent ? (
                <Input
                  id="end_date"
                  value={newProject.end_date}
                  className="DialogInput flex-col justify-between"
                  onChange={handleInputChange}
                  type="month"
                />
              ) : (
                <span className="DialogInput w-full p-2">Present</span>
              )}
              <div className="flex flex-row gap-x-2 items-center">
                <input
                  type="checkbox"
                  checked={isPresent}
                  onChange={handlePresentChange}
                />
                <label>Present</label>
              </div>
            </div>

            <div className="DialogLayout col-span-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newProject.description}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button
              className="text-violet11 hover:bg-violet-400 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close">
              <Cross2Icon />
            </Button>
          </DialogClose>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="PrimaryButton"
                type="submit"
                onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
