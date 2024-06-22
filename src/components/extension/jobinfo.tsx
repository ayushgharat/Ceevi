import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const JobInfoComponent = ({ generateResumeDetails, navigateToHomePage }) => {
  const [jobInfo, setJobInfo] = useState("")
  const [userPref, setUserPref] = useState("")

  return (
    <div className="w-[300px] h-[400px] rounded-3xl p-8 bg-white flex flex-col place-content-between overflow-scroll">
      <div className="flex flex-row items-start">
        <button onClick={navigateToHomePage}>
          <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
        </button>
        <span className="ms-2 font-extension-text text-lg">
          Enter the job Information:
        </span>
      </div>
      <textarea
        className="overflow-hidden border-[1px] border-black rounded-[29px] mt-4 mb-6 h-60 resize-none p-4 font-extension-text min-h-[200px]"
        value={jobInfo}
        onChange={(e) => setJobInfo(e.target.value)}></textarea>

      <span className="font-extension-text text-sm">
        Feel free to give CeeVi some guidance if you are looking for some
        specifics
      </span>

      <textarea
        className="overflow-hidden border-[1px] border-black rounded-[29px] mt-4 mb-6 h-60 resize-none p-4 font-extension-text min-h-[200px]"
        value={userPref}
        onChange={(e) => setUserPref(e.target.value)}></textarea>

      <button
        className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-white text-[16px] font-semibold font-extension-title rounded-[29px] w-full py-2 shadow-[0_4px_0_rgba(0,0,0,0.25)] place-self-end"
        onClick={() => generateResumeDetails(jobInfo, userPref)}>
        Next
      </button>
    </div>
  )
}

export default JobInfoComponent
