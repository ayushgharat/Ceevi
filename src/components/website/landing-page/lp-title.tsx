import Link from "next/link"
import PrimaryButton from "../ui/primary-button"

const LPTitle = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[550px] p-10 sm:p-20 lg:p-32 lg:h-[95vh] 3xl:p-72">
      <span className="font-poppins font-semibold text-2xl text-center sm:text-3xl lg:text-5xl lg:leading-relaxed 3xl:text-8xl 3xl:leading-normal">
        Ceevi: Craft <span className="text-vivid_violet">Resumes</span> that get
        you <span className="text-vivid_violet">noticed!</span>
      </span>
      <div className="bg-gradient-to-r from-vivid_violet to-electric_indigo w-full h-1 rounded-xl mt-8 mb-9 lg:my-16 3xl:h-4"></div>
      <span className="font-dmsans text-center font-light text-base mb-8 sm:text-lg lg:text-3xl lg:mb-12 3xl:text-6xl 3xl:leading-normal">
        <span className="font-medium">Ready to break free from the one-size-fits-all resume?</span>{" "}
        Ceevi empowers you to create tailored resumes that align perfectly with
        any job posting, ensuring you make a lasting impression.
      </span>
      <Link href="/authenticate/signup" className="bg-gradient-to-r from-vivid_violet to-electric_indigo text-regular font-poppins font-semibold text-white w-fit px-10 rounded-[29px] py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:py-3 lg:w-fit lg:text-xl lg:px-16 3xl:text-4xl 3xl:px-32 3xl:py-10 3xl:rounded-[60px] 3xl:mt-20" >Try the Beta</Link>
    </div>
  )
}

export default LPTitle
