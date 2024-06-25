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
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons"
import { useState, type ChangeEvent } from "react"

export function ProfileDialogPersonal({ personal, updatePersonal }) {
  const [newPersonal, setNewPersonal] = useState(personal)

  const handleSaveChanges = () => {
    updatePersonal(newPersonal)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewPersonal((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-col items-start justify-start">
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
              <Label htmlFor="First Name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                value={newPersonal.first_name}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                value={newPersonal.last_name}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={newPersonal.email}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="phone number" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone_number"
                value={newPersonal.phone_number}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="linkedin" className="text-right">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={newPersonal.linkedin}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
            <div className="DialogLayout">
              <Label htmlFor="github" className="text-right">
                Github URL
              </Label>
              <Input
                id="github"
                value={newPersonal.github}
                className="DialogInput"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <DialogClose asChild>
            <Button
              className=""
              aria-label="Close">
              <Cross2Icon />
            </Button>
          </DialogClose> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="PrimaryButton mt-5"
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
