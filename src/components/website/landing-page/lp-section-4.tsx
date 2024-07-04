import Link from "next/link"

import SecondaryButton from "../ui/secondary-button"

const Section4 = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-vivid_violet to-electric_indigo mx-6 rounded-3xl px-6 py-6 shadow-[6px_6px_0_rgba(0,0,0,0.25)] lg:py-20 lg:px-20 lg:mx-20 lg:mb-20">
      <span className="font-poppins text-xl text-white font-medium sm:text-2xl lg:text-4xl">
        Getting Started with CeeVi today
      </span>
      <span className="mt-4 mb-8 font-dmsans font-light text-white sm:text-xl lg:text-3xl lg:mt-10 lg:mb-20">
        Don’t miss out on your dream job. Sign up now and start creating
        tailored resumes that get results.
      </span>
      <Link
        href="/authenticate/signup"
        className="bg-white text-sm font-poppins font-semibold text-vivid_violet w-fit px-10 rounded-[29px] py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:py-3 lg:w-fit lg:px-10 lg:text-xl lg:shadow-[0px_9px_9px_rgba(0,0,0,0.25)]">
        Try it now
      </Link>
    </div>
  )
}

export default Section4
