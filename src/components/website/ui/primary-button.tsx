const PrimaryButton = ({ text }) => {
  return (
    <button className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-regular font-poppins font-semibold text-white w-full rounded-[29px] py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:py-3">
      {text}
    </button>
  )
}

export default PrimaryButton
