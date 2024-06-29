import Link from "next/link";

const Main = ({currentUser, buildResume}) => {
  return (
    <div className="bg-white h-full relative w-full rounded-3xl flex flex-col">
      <span className="m-10 font-poppins text-3xl text-black">
        Welcome, {currentUser.user_metadata.name}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 lg:grid-cols-3 xl:gap-x-14 xl:mx-10 gap-x-5 font-dmsans mx-5">
        <button
          onClick={buildResume}
          className="border-l-4 border-vivid_violet shadow-lg text-xl p-3 rounded-[10px]">
          <span>⛏️ Build a resume</span>
        </button>
        <Link href='/profile' className="border-l-4 border-vivid_violet shadow-lg text-xl p-3 rounded-[10px]">
          <span>👤 Edit Profile</span>
        </Link>
        <button disabled className="border-l-4 border-vivid_violet shadow-lg text-xl p-3 rounded-[10px] disabled:bg-slate-400">
          <span>💻 Get Chrome Extension</span>
        </button>
      </div>
    </div>
  )
}

export default Main;