"use client"

import { useState } from "react"
import { PuffLoader } from "react-spinners"

import { login } from "~app/action"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const response = await login(email, password)
    if (response && response.message) {
      setMessage(response.message)
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col items-start justify-center w-1/2 font-dmsans">
      <span className="text-4xl mb-16 font-poppins">Welcome to Ceevi</span>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={e => setEmail(e.target.value)}
        required
        className="peer w-full py-2 px-3 rounded-[30px] border-[1px] border-electric_indigo focus:border-vivid_violet"
      />
      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        required
        className="peer w-full py-2 px-3 rounded-[30px] border-[1px] border-electric_indigo focus:border-vivid_violet"
      />
      <div className="w-full flex flex-col justify-center">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="PrimaryButton mt-10 flex flex-col items-center">
          {loading ? (
            <PuffLoader size={30} color="#ffffff" className="h-1 w-1" />
          ) : (
            <span className="text-center">Login</span>
          )}
        </button>
        {message && (
          <span className="text-center w-full pt-5 text-red-600">
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
