const Section2 = () => {
  return (
    <div className="mx-2 sm:mx-6 lg:mx-20 sm:px-6 bg-electric_indigo rounded-[29px] px-4 pt-10 pb-6 shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] lg:px-20 lg:pb-16">
      <p className="px-6 font-poppins font-semibold mb-5 text-white text-xl text-center drop-shadow-xl sm:text-2xl lg:text-4xl">
        Unlock your full potential with Ceevi
      </p>

      <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-16 lg:mt-12">
        <div className="bg-lavendar rounded-2xl py-8 w-full flex flex-col px-10 shadow-[9px_9px_4px_0_rgba(0,0,0,0.25)]">
          <span className="font-poppins text-xl font-semibold lg:text-3xl">
            🚀 Boost your chances
          </span>
          <span className="mt-4 font-dmsans lg:text-2xl">
            Customized resumes highlight your most relevant skills and
            experiences, making you the standout candidate every time.
          </span>
        </div>

        <div className="bg-lavendar rounded-2xl py-8 w-full flex flex-col px-10 shadow-[9px_9px_4px_0_rgba(0,0,0,0.25)]">
          <span className="font-poppins text-xl font-semibold lg:text-3xl">
            💡 Intelligent Suggestions
          </span>
          <span className="mt-4 font-dmsans lg:text-2xl">
            Leverage Ceevi's smart analysis of job postings to tailor your
            resume effortlessly. Let our tool do the heavy lifting so you can
            focus on landing the interview
          </span>
        </div>

        <div className="bg-lavendar rounded-2xl py-8 w-full flex flex-col px-10 shadow-[9px_9px_4px_0_rgba(0,0,0,0.25)]">
          <span className="font-poppins text-xl font-semibold lg:text-3xl">
            🌐 User-Friendly Interface
          </span>
          <span className="mt-4 font-dmsans lg:text-2xl">
            Our intuitive platform makes resume customization a breeze, whether
            you’re a tech novice or a seasoned pro.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Section2
