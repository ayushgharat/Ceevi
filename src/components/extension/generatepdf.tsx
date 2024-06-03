const GeneratePDF = ({ finalData }) => {
  const generateResume = () => {
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

        // Example usage: create a URL for the Blob and open in a new window
        const pdfUrl = URL.createObjectURL(pdfBlob)
        window.open(pdfUrl)

        // Clean up by revoking the object URL when done with the Blob
        URL.revokeObjectURL(pdfUrl)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        // Handle fetch error here
      })
  }

  return (
    <div>
      <span>The PDF has been generated</span>
      <button onClick={generateResume}>Click here to view</button>
    </div>
  )
}

export default GeneratePDF
