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
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons"
import React from "react"
import { useState, type ChangeEvent } from "react"

interface ProfileDialogPersonalProps {
  personal: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    linkedin: string
    github: string
    portfolio: string
  }
  updatePersonal: (personal: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    linkedin: string
    github: string
    portfolio: string
  }) => void
}

export function ProfileDialogPersonal({ personal, updatePersonal }: ProfileDialogPersonalProps) {
  if (!personal || !updatePersonal) {
    console.error("ProfileDialogPersonal: Missing required props.")
    return null
  }

  const [newPersonal, setNewPersonal] = useState(personal)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const handleSaveChanges = () => {
    if (validateInputs()) {
      updatePersonal(newPersonal)
      setOpen(false)
    } 
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setNewPersonal((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "linkedin",
      "github"
    ]

    requiredFields.forEach((field) => {
      if (!newPersonal[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="flex flex-col items-start justify-start" onClick={() => setOpen(true)}>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[30px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="DialogLayout">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                value={newPersonal.first_name || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                value={newPersonal.last_name || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={newPersonal.email || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="phone_number" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone_number"
                value={newPersonal.phone_number || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.phone_number && <span className="text-red-500">{errors.phone_number}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="linkedin" className="text-right">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={newPersonal.linkedin || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.linkedin && <span className="text-red-500">{errors.linkedin}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="github" className="text-right">
                Github URL
              </Label>
              <Input
                id="github"
                value={newPersonal.github || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.github && <span className="text-red-500">{errors.github}</span>}
            </div>

            <div className="DialogLayout">
              <Label htmlFor="portfolio" className="text-right">
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                value={newPersonal.portfolio || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.portfolio && <span className="text-red-500">{errors.github}</span>}
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
              className="PrimaryButton mt-5"
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
