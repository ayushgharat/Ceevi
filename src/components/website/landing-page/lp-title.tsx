import PrimaryButton from "../ui/primary-button"

const LPTitle = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[550px] p-10 sm:p-20 lg:p-32 lg:h-[95vh]">
      <span className="font-poppins font-semibold text-2xl text-center sm:text-3xl lg:text-5xl lg:leading-relaxed">
        Ceevi: Craft <span className="text-vivid_violet">Resumes</span> that get
        you <span className="text-vivid_violet">noticed!</span>
      </span>
      <div className="bg-gradient-to-r from-vivid_violet to-electric_indigo w-full h-1 rounded-xl mt-8 mb-9 lg:my-16"></div>
      <span className="font-dmsans text-center font-light text-base mb-8 sm:text-lg lg:text-3xl lg:mb-12">
        <span className="font-medium">Ready to break free from the one-size-fits-all resume?</span>{" "}
        Ceevi empowers you to create tailored resumes that align perfectly with
        any job posting, ensuring you make a lasting impression.
      </span>
      <PrimaryButton text="Join the Waitlist"/>
    </div>
  )
}

export default LPTitle
