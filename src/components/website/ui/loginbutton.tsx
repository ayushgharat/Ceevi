"use client"

import { useFormStatus } from "react-dom"
import { PuffLoader } from "react-spinners"

import { login } from "~app/action"

export function LoginButton() {
  const { pending } = useFormStatus()

  //TODO: Change the size of the spinner animation to match the size of the button

  return (
    <button
      type="submit"
      disabled={pending}
      formAction={login}
      className="PrimaryButton mt-10 flex flex-col items-center">
    
      {pending ? <PuffLoader color="#ffffff" className="h-1 w-1"/> : <span className="text-center">Login</span>}
    </button>
  )
}
