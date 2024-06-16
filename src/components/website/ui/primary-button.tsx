const PrimaryButton = ({ text }) => {
  return (
    <button className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-regular font-poppins font-semibold text-white w-full rounded-[29px] py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:py-3 lg:w-fit lg:text-xl lg:px-16 3xl:text-4xl 3xl:px-32 3xl:py-10 3xl:rounded-[60px] 3xl:mt-20">
      {text}
    </button>
  )
}

export default PrimaryButton
