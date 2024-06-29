import { useState } from "react"

export const SubmitResume = ({setActiveStep, setResume}) => {

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFile(e.target.value)
    }

    const handleSubmit = async () => {

        setLoading(true)
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({user_info: file})
          }

        const response  = await fetch("/api/extract", requestOptions)
        const data = await response.json()
        if(data) {
            setLoading(false)
            console.log(data)
            setResume(data)
            setActiveStep(1)
        }
    }

    return (
        <div className="flex flex-col">
            <span className="text-xl">Paste the content of your resume:</span>
            <textarea className="DialogInput p-3" value={file} onChange={handleChange} required/>
            <button className="PrimaryButton mt-10" onClick={handleSubmit}>Submit File</button>
            {loading && <span>Processing your info...</span>}
        </div>
    )
}