import SecondaryButton from "../ui/secondary-button";

const Section4 = () => {
    return ( <div className="flex flex-col bg-gradient-to-br from-vivid_violet to-electric_indigo mx-6 rounded-3xl px-6 py-6 shadow-[6px_6px_0_rgba(0,0,0,0.25)]">
        <span className="font-poppins text-xl text-white font-medium sm:text-2xl">Getting Started with CeeVi today</span>
        <span className="mt-4 mb-8 font-dmsans font-light text-white sm:text-xl">Don’t miss out on your dream job. Sign up now and start creating tailored resumes that get results.</span>
        <SecondaryButton text="Join the Waitlist" />
    </div> );
}
 
export default Section4;