import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"

const DegreeLevelSelect = ({ selectedValue, setSelectedValue }) => {
  //const [selectedValue, setSelectedValue] = useState(null)

  return (
    <Select
      value={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}>
      <SelectTrigger className="DialogInput">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="w-full bg-white font-dmsans flex flex-col gap-y-3">
        <SelectItem value="Bachelors">Bachelors</SelectItem>
        <SelectItem value="Masters">Masters</SelectItem>
        <SelectItem value="PhD">PhD</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DegreeLevelSelect
