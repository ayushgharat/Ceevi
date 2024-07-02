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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Cross2Icon,
  DotsVerticalIcon,
  Pencil1Icon
} from "@radix-ui/react-icons"
import { useState, type ChangeEvent } from "react"

import DegreeLevelSelect from "./degree-level-selector"

export function ProfileDialogEducation({
  education,
  index,
  updateEducation,
  deleteEducation
}) {
  const [newEducation, setNewEducation] = useState(education)

  const handleSaveChanges = () => {
    updateEducation(newEducation, index)
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-xl font-dmsans flex flex-col p-3 gap-y-3 shadow-lg">
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <button>Edit</button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={() => deleteEducation(index)}>Delete</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[30px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Edit education</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="DialogLayout">
              <Label htmlFor="Name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newEducation.name}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newEducation.location}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="degree_level" className="text-right">
                Degree Level
              </Label>
              <DegreeLevelSelect
                selectedValue={newEducation.degree_level}
                setSelectedValue={handleSelectChange}
                
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="major" className="text-right">
                Major
              </Label>
              <Input
                id="major"
                value={newEducation.major}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>

            <div className="DialogLayout">
              <Label htmlFor="gpa" className="text-right">
                GPA
              </Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
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
                value={newEducation.start_date}
                className="DialogInput justify-between flex-col"
                onChange={handleInputChange}
                type="month"
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              <Input
                id="end_date"
                value={newEducation.end_date}
                className="DialogInput justify-between flex-col"
                onChange={handleInputChange}
                type="month"
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
                className="PrimaryButton mb-10"
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
