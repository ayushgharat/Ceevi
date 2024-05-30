import { useState } from "react"

export function Main({ name = "Extension" }) {
  const [data, setData] = useState("")

  return (
    <div>
      <span>Welcome to the homepage</span>

    </div>
  )
}
