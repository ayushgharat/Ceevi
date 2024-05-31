import Link from "next/link"

const Header = ({}) => {
  return (
    <div className="w-full bg-purple-600 h-12 px-10 justify-between flex flex-row items-center">
      <span className="text-3xl font-bold text-white">Ceevi</span>
      <Link href="/dashboard/profile" className="text-white">
        Profile
      </Link>
    </div>
  )
}

export default Header
