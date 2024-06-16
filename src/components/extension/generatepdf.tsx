import { ChevronLeftIcon } from "@radix-ui/react-icons" 
import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"

import "~style.css"

const GeneratePDF = ({ finalData, navigateToVerifyExperiences }) => {
  const [fileBlob, setFileBlob] = useState<Blob | null>(null)

  useEffect(() => {
    console.log(finalData)
    const postData = {
      data: finalData
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }

    fetch("http://localhost:1947/api/generate/pdf", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.arrayBuffer()
      })
      .then((buffer) => {
        // `buffer` now contains the PDF content as an ArrayBuffer
        console.log("Received PDF buffer:", buffer)

        // Example usage: create a Blob from the ArrayBuffer
        const pdfBlob = new Blob([buffer], { type: "application/pdf" })

        setFileBlob(pdfBlob)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        // Handle fetch error here
      })
  }, [])

  const openPDFinNewTab = () => {
    const blobUrl = URL.createObjectURL(fileBlob!)
    //chrome.tabs.create({ url: blobUrl, active: false })
    window.open(blobUrl, "_blank", "toolbar=yes,width=800,height=600")
  }

  return (
    <div className="w-[300px] h-[400px] rounded-3xl p-8 bg-white flex flex-col place-content-between">
      {fileBlob ? (
        <>
          <div className="flex flex-row items-start mb-10">
            <button onClick={navigateToVerifyExperiences}>
              <ChevronLeftIcon className="h-[25px] w-[30px] mt-[2px]" />
            </button>
            <span className="ms-2 font-extension-text text-lg">
              Your resume has been successfully generated 
            </span>
          </div>
          <button className="PrimaryButton" onClick={openPDFinNewTab}>
            Click here to view
          </button>
        </>
      ) : (
        <>
          <span className="font-extension-title text-xl justify-self-center">
            Generating your PDF
          </span>
          <div className="flex flex-col items-center justify-center h-full">
            <PuffLoader />
          </div>
        </>
      )}
    </div>
  )
}

export default GeneratePDF
