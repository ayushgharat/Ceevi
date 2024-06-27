import "~/style.css"

import { PuffLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="h-[400px] w-[300px] rounded-3xl border-2 border-vivid_violet p-8 bg-white flex flex-col">
      <span className="font-extension-title text-2xl">CeeVi</span>
      <span className="font-extension-text text-xl font-light mt-10">
        Logging you in...
      </span>
      <div className="flex flex-col items-center justify-center h-full">
        <PuffLoader />
      </div>
    </div>
  )
}

export default Loading
