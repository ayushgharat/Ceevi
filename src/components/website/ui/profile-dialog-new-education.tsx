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
import { useState, type ChangeEvent } from "react"

import type { EducationItem } from "~types"

import DegreeLevelSelect from "./degree-level-selector"

export function ProfileDialogNewEducation({ addNewEducation }) {
  const [newEducation, setNewEducation] = useState<EducationItem>({
    name: "",
    location: "",
    degree_level: "",
    major: "",
    gpa: "",
    start_date: "",
    end_date: ""
  })

  const handleSaveChanges = () => {
    addNewEducation(newEducation)
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setNewEducation((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSelectChange = (value) => {
    //const { value } = event.target
    setNewEducation((prevState) => ({
      ...prevState,
      degree_level: value
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogHeader>
            <DialogTitle>Edit education</DialogTitle>
            <DialogDescription>
              Make changes to your education here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newEducation.name}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newEducation.location}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree_level" className="text-right">
                Degree Level
              </Label>
              <DegreeLevelSelect
                selectedValue={newEducation.degree_level}
                setSelectedValue={handleSelectChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="major" className="text-right">
                Major
              </Label>
              <Input
                id="major"
                value={newEducation.major}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gpa" className="text-right">
                GPA
              </Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start_date"
                value={newEducation.start_date}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              <Input
                id="end_date"
                value={newEducation.end_date}
                className="col-span-3"
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
                className="bg-violet-400 hover:bg-violet-700 text-white p-2 rounded-sm items-center inline-flex"
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
