const LPFooter = () => {
  return (
    <div className="bg-black mt-6 flex flex-row justify-between p-4 rounded-t-xl sm:px-8 lg:p-20 lg:rounded-t-[40px]">
      <div>
        <span className="ms-2 mt-4 text-white font-poppins text-3xl font-semibold lg:text-6xl">CeeVi</span>
      </div>
      <div className="flex flex-col text-white font-dmsans text-right text-sm space-y-3 font-light my-2 sm:text-base lg:text-2xl lg:space-y-10">
        <button className="text-right">Product</button>
        <button className="text-right">About Us</button>
        <button className="text-right">Pricing</button>
      </div>
    </div>
  )
}

export default LPFooter
