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
import { useState } from "react"

export function ProfileDialogExperience({
  experience,
  index,
  updateExperience,
  deleteExperience
}) {
  const [newExperience, setNewExperience] = useState(experience)
  const [isPresent, setIsPresent] = useState(experience.end_date === "Present")

  const handleSaveChanges = () => {
    updateExperience(
      {
        ...newExperience,
        end_date: isPresent ? "Present" : newExperience.end_date
      },
      index
    )
  }

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target
    setNewExperience((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value
    }))
  }

  const handlePresentChange = () => {
    setIsPresent(!isPresent)
    setNewExperience((prevState) => ({
      ...prevState,
      end_date: !isPresent ? "Present" : ""
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
            <button onClick={() => deleteExperience(index)}>Delete</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogPortal>
        <DialogOverlay className="DialogOverlay z-10" />
        <DialogContent className="data-[state=open]:animate-contentShow z-20 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[40px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-scroll">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Edit experience</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="DialogLayout">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={newExperience.company}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                value={newExperience.role}
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
                value={newExperience.location}
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
                value={newExperience.start_date}
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
                  value={newExperience.end_date}
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
                value={newExperience.description}
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
