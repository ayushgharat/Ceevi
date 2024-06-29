import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const BuildResume = ({ onBack, generateResume }) => {
  const [jobInfo, setJobInfo] = useState("")
  const [userPref, setUserPref] = useState("")

  const handleJobInfoChange = (e) => {
    setJobInfo(e.target.value)
  }

  const handleUserPrefChange = (e) => {
    setUserPref(e.target.value)
  }

  const handleGenerateResume = () => {
    generateResume(jobInfo, userPref)
  }

  return (
    <div className="bg-white h-full relative w-full rounded-3xl flex flex-col p-10">
      <div className="flex flex-row gap-x-3">
        <button onClick={onBack}>
          <ChevronLeftIcon height={30} width={30} />
        </button>
        <span className="font-poppins text-3xl text-black">
          Let's build your next resume
        </span>
      </div>

      <div className="grid grid-cols-2 font-dmsans text-lg mt-10 gap-x-10 gap-y-8">
        <div className="flex flex-col">
          <span>Enter the job description and qualifications here</span>
        </div>
        <div className="flex flex-col">
          <span>
            (Optional) Mention any instructions that you would like CeeVi to
            follow
          </span>
        </div>
        <textarea
          value={jobInfo}
          onChange={handleJobInfoChange}
          className="DialogInput min-h-40 p-3"
        />
        <textarea
          value={userPref}
          onChange={handleUserPrefChange}
          className="DialogInput min-h-40 p-3"
        />
      </div>

      <div className="w-full flex flex-row justify-end items-end mt-16">
        <button
          onClick={handleGenerateResume}
          className="PrimaryButton max-w-[200px]">
          Generate
        </button>
      </div>
    </div>
  )
}

export default BuildResume
