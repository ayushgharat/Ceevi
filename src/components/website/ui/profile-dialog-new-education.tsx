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
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState, type ChangeEvent } from "react"

import type { EducationItem } from "~types"

import DegreeLevelSelect from "./degree-level-selector"
import React from "react"

interface ProfileDialogNewEducationProps {
  addNewEducation: (education: EducationItem) => void
}

export function ProfileDialogNewEducation({ addNewEducation }: ProfileDialogNewEducationProps) {
  if (!addNewEducation) {
    console.error("ProfileDialogNewEducation: Missing required prop addNewEducation.")
    return null
  }

  const [newEducation, setNewEducation] = useState<EducationItem>({
    name: "",
    location: "",
    degree_level: "",
    major: "",
    gpa: "",
    start_date: "",
    end_date: ""
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const handleSaveChanges = () => {
    if (validateInputs()) {
      addNewEducation(newEducation)
      setOpen(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event && event.target) {
      const { id, value } = event.target
      setNewEducation((prevState) => ({
        ...prevState,
        [id]: value
      }))
    }
  }

  const handleSelectChange = (value: string) => {
    setNewEducation((prevState) => ({
      ...prevState,
      degree_level: value
    }))
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const requiredFields: (keyof EducationItem)[] = [
      "name",
      "location",
      "degree_level",
      "major",
      "gpa",
      "start_date",
      "end_date"
    ]

    requiredFields.forEach((field) => {
      if (!newEducation[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button className="PrimaryButton" onClick={() => setOpen(true)}>Add New Education</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[40px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogHeader>
            <DialogTitle className="DialogTitle">Add New Education</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="DialogLayout">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newEducation.name || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newEducation.location || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.location && <span className="text-red-500">{errors.location}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="degree_level" className="text-right">
                Degree Level
              </Label>
              <DegreeLevelSelect
                selectedValue={newEducation.degree_level || ""}
                setSelectedValue={handleSelectChange}
              />
              {errors.degree_level && <span className="text-red-500">{errors.degree_level}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="major" className="text-right">
                Major
              </Label>
              <Input
                id="major"
                value={newEducation.major || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.major && <span className="text-red-500">{errors.major}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="gpa" className="text-right">
                GPA
              </Label>
              <Input
                id="gpa"
                value={newEducation.gpa || ""}
                className="DialogInput"
                onChange={handleInputChange}
              />
              {errors.gpa && <span className="text-red-500">{errors.gpa}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="start_date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start_date"
                value={newEducation.start_date || ""}
                className="DialogInput flex-col justify-between"
                onChange={handleInputChange}
                type="month"
              />
              {errors.start_date && <span className="text-red-500">{errors.start_date}</span>}
            </div>
            <div className="DialogLayout">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              <Input
                id="end_date"
                value={newEducation.end_date || ""}
                className="DialogInput flex-col justify-between"
                onChange={handleInputChange}
                type="month"
              />
              {errors.end_date && <span className="text-red-500">{errors.end_date}</span>}
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
