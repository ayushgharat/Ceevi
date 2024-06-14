import PrimaryButton from "../ui/primary-button"

const LPHeader = () => {
  return (
    <div className="pt-10 px-10 flex flex-row lg:justify-between lg:items-center">
      <span className="font-poppins text-[32px] font-normal">Ceevi</span>
      <div className="hidden lg:flex flex-row gap-x-10  text-black font-dmsans">
        <span>Product</span>
        <span>About Us</span>
        <span>Pricing</span>
      </div>

      <div className="hidden lg:flex">
      <PrimaryButton text="Sign Up" />
      </div>
    </div>
  )
}

export default LPHeader
