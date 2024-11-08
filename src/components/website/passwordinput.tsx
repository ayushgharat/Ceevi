import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"

export const PasswordInput = ({id, value, onChange}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          id={id}
          value={value}
          onChange={onChange}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }