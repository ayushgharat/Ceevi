import { Input } from "@chakra-ui/react"
import React, { useEffect, useState, type ChangeEvent } from "react"

interface DateInputProps {
  value: string
  onChange: (formattedDate: string) => void
  name: string
  placeholder: string
}

const formatMonth = (dateString: string) => {
  const date = new Date(dateString)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  const month = monthNames[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${month} ${year}`
}

const convertToMonthInput = (formattedDate: string): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  const [monthAbbr, year] = formattedDate.split(" ")

  const monthIndex = monthNames.indexOf(monthAbbr)
  const month = (monthIndex + 1).toString().padStart(2, "0") // Convert monthIndex to 2-digit month

  return `${year}-${month}`
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  name,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState(convertToMonthInput(value))

  console.log(inputValue)

  useEffect(() => {
    setInputValue(convertToMonthInput(value))
  }, [value])

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatMonth(event.target.value)
    onChange(formattedDate)
  }

  return (
    <input
      type="month"
      value={inputValue}
      name={name}
      placeholder={placeholder}
      onChange={handleDateChange}
      className="w-fit"
    />
  )
}

export default DateInput
