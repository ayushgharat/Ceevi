import Link from "next/link"
import PrimaryButton from "../ui/primary-button"

const LPHeader = () => {
  return (
    <div className="pt-10 px-10 flex flex-row lg:grid lg:grid-cols-2 lg:justify-items-center  lg:items-center">
      <span className="font-poppins text-[32px] font-normal lg:justify-self-start">Ceevi</span>
      {/* <div className="hidden lg:flex flex-row gap-x-10  text-black font-dmsans">
        <span>Product</span>
        <span>About Us</span>
        <span>Pricing</span>
      </div> */}

      <div className="hidden lg:flex lg:justify-self-end">
      <Link href="/authenticate/signup" className="PrimaryButton py-5 px-10" >Sign Up</Link>
      </div>
    </div>
  )
}

export default LPHeader
