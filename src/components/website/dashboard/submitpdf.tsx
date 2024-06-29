const SubmitPDF = ({ navigateToVerifyInformation, fileBlob }) => {

    const openPDFinNewTab = () => {
        const blobUrl = URL.createObjectURL(fileBlob!)
        //chrome.tabs.create({ url: blobUrl, active: false })
        window.open(blobUrl, "_blank", "toolbar=yes,width=800,height=600")
      }

  return (
    <div className="bg-white h-full relative w-full rounded-3xl flex flex-col p-10 overflow-scroll">
      <div className="flex flex-row gap-x-3 justify-between">
        <span className="font-poppins text-3xl text-black">
          Your PDF is ready
        </span>
        <button
          className="rounded-2xl border-[1px] border-black p-3 font-dmsans border-opacity-50"
          onClick={navigateToVerifyInformation}>
          Edit Details
        </button>
      </div>{" "}

      <button onClick={openPDFinNewTab} className="PrimaryButton mt-10">Open in New Tab</button>
    </div>
  )
}

export default SubmitPDF
