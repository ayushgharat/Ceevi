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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="bg-purple-100 w-[180px]">
        <SelectItem value="Bachelors">Bachelors</SelectItem>
        <SelectItem value="Masters">Masters</SelectItem>
        <SelectItem value="PhD">PhD</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DegreeLevelSelect
