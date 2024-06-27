"use client"

import {
  ChevronLeftIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon
} from "@radix-ui/react-icons"
import { useState } from "react"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"

const CustomSidebar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }

  return (
    <div className="z-0 shadow-[4px_4px_0_rgba(0,0,0,0.25)]">
      <Sidebar collapsed={menuCollapse}>
        {!menuCollapse ? (
          <div className="flex flex-row justify-between items-center mt-5 py-2 mx-5">
            <span className={` font-poppins text-2xl`}>Ceevi</span>
            <button
              onClick={menuIconClick}
              className={`rounded-lg border-[1px] w-fit h-fit border-black flex flex-col justify-center items-center ${menuCollapse && "rotate-180"}`}>
              <ChevronLeftIcon height={20} width={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-y-4 items-center mt-5 py-2 justify-center">
            <span className={` font-poppins text-4xl text-center`}>C</span>
            <button
              onClick={menuIconClick}
              className={`rounded-lg border-[1px] w-fit bg-white h-fit border-black flex flex-col justify-center items-center ${menuCollapse && "rotate-180"}`}>
              <ChevronLeftIcon height={20} width={20} />
            </button>
          </div>
        )}

        <Menu>
          <MenuItem icon={<DashboardIcon />} href="/dashboard">
            <span
              className={`font-poppins font-semibold text-lg ${menuCollapse && "hidden"}`}>
              Dashboard
            </span>
          </MenuItem>
          <MenuItem icon={<PersonIcon />} href="/profile">
            <span
              className={`font-poppins font-semibold text-lg ${menuCollapse && "hidden"}`}>
              Profile
            </span>
          </MenuItem>
          <MenuItem icon={<GearIcon />} href="/settings">
            <span
              className={`font-poppins font-semibold text-lg ${menuCollapse && "hidden"}`}>
              Settings
            </span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default CustomSidebar
