import { PuffLoader } from "react-spinners"

const GeneratingDetailsLoading = () => {
  return (
    <div className="h-[400px] w-[300px] rounded-3xl border-2 border-vivid_violet p-8 bg-white flex flex-col">
      <span className="ms-2 font-extension-text text-lg">
          Generating your resume
        </span>
      <div className="flex flex-col items-center justify-center h-full">
        <PuffLoader />
      </div>
    </div>
  )
}

export default GeneratingDetailsLoading
