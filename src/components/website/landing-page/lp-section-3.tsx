const Section3 = () => {
  return (
    <div className="py-10 px-6 flex flex-col items-center">
      <span className="font-poppins font-semibold text-2xl">
        How do I use CeeVi?
      </span>
      <div className="grid grid-cols-1 space-y-8 sm:grid-cols-2 sm:gap-x-4">
        <div className="mt-7 p-6 border-2 flex flex-col border-vivid_violet rounded-3xl shadow-[6px_6px_4px_0_rgba(214,23,209,0.43)] font-dmsans text-lg font-semibold">
          <span>1.</span>
          <span className="mt-4">
            Create an account and fill out your profile
          </span>
          <span className="mt-2 text-xs">
            (Don’t worry, it’s the last time you will ever have to fill it out)
          </span>
        </div>

        <div className="mt-4 p-6 border-2 flex flex-col border-vivid_violet rounded-3xl shadow-[6px_6px_4px_0_rgba(214,23,209,0.43)] font-dmsans text-lg font-semibold">
          <span>2.</span>
          <span className="mt-4">
            Download our chrome extension{" "}
            <span className="underline">here</span> and pin it to your browser.
          </span>
        </div>

        <div className="mt-4 p-6 border-2 flex flex-col border-vivid_violet rounded-3xl shadow-[6px_6px_4px_0_rgba(214,23,209,0.43)] font-dmsans text-lg font-semibold">
          <span>3.</span>
          <span className="mt-4">
            When you need a resume, click on the extension and paste the job
            description and requirements
          </span>
        </div>

        <div className="mt-4 p-6 border-2 flex flex-col border-vivid_violet rounded-3xl shadow-[6px_6px_4px_0_rgba(214,23,209,0.43)] font-dmsans text-lg font-semibold">
          <span>4.</span>
          <span className="mt-4">
            Verify the information generated by the AI and submit the new resume
          </span>
        </div>
      </div>
    </div>
  )
}

export default Section3
