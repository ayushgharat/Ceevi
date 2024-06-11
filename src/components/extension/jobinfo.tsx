import { useState } from "react"

const JobInfoComponent
 = ({ generateResumeDetails }) => {

  const [jobInfo, setJobInfo] = useState("")

  return (
    <div className="w-[300px] h-[300px] flex flex-col p-4">
      <span className="text-2xl font-medium">Enter Job Information</span>
      <textarea className="border-2 border-black rounded-lg mt-4 h-20 resize-none p-1" value={jobInfo} onChange={(e) => setJobInfo(e.target.value)}></textarea>
      <button className="bg-purple-700 rounded-lg mt-20 text-xl py-2 text-white" onClick={() => generateResumeDetails(jobInfo)}>Next</button>
    </div>
  )
}

export default JobInfoComponent

