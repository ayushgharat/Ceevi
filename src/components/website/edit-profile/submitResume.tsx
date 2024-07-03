import pdfParse from "pdf-parse"
import { useState } from "react"

export const SubmitResume = ({ setActiveStep, setResume }) => {
  const [file, setFile] = useState()
  const [pdf, setPDF] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFile(e.target.value)
  }

//   const handleFileSubmission = async (e) => {
//     setPDF(e.target.files[0])
//   }

  const handleSubmit = async () => {
    // const objectURL = window.URL.createObjectURL(pdf)
    // console.log(objectURL)

    // const formData = new FormData()

    // if (pdf) {
    //   formData.append("file", pdf)

      //console.log(formData)
      setLoading(true)
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({user_info: file})
        //body: formData
      }

      const response = await fetch("/api/extract", requestOptions)
      const data = await response.json()
      if (data) {
        setLoading(false)
        console.log(data)
        setResume(data)
        setActiveStep(1)
      }
    }
  

  return (
    <div className="flex flex-col">
      <span className="text-xl">Paste the content of your resume:</span>
      <textarea
        className="DialogInput p-3"
        value={file}
        onChange={handleChange}
      />
      {/* <span className="mt-5">Alternatively, submit the pdf here</span>
      <input type="file" accept="/pdf" onChange={handleFileSubmission}></input> */}
      <button className="PrimaryButton mt-10" onClick={handleSubmit}>
        Submit File
      </button>

      <button className="PrimaryButton mt-10" onClick={e => setActiveStep(1)}>
        Skip
      </button>
      {loading && <span>Processing your info...</span>}
    </div>
  )
}
// import { useForm } from 'react-hook-form';

// export default function Submit() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append('files', data.files);

//     await fetch("/api/extract", {
//         method: 'POST',
//         body: formData,
//     });    

//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="file" multiple={true} />
//     </form>
//   );
// }
