import { PersonIcon } from "@radix-ui/react-icons"
import "~style.css"

const HomePage = ({ user, navigateToJobInfo }) => {
  return (
    <div className="flex flex-col font-cmuRoman items-center justify-between w-[300px] h-[300px] p-4">
      <div className="flex flex-row justify-between">
      <span className="text-2xl font-semibold">
        Welcome, <span className="text-lg">{user.email}</span>
      </span>

      <PersonIcon className="h-10 w-10"/>
      </div>
      <button
        className="bg-purple-700 text-white text-xl rounded-lg p-2"
        onClick={navigateToJobInfo}>
        Create a new resume
      </button>
    </div>
  )
}

export default HomePage
