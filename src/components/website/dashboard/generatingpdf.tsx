import { PuffLoader } from "react-spinners";

const GeneratingPDF = () => {
    return ( <div className="bg-white h-full relative w-full rounded-3xl flex flex-col items-center justify-center p-10">
        <div className="flex flex-row gap-x-3">
          <span className="font-poppins text-3xl text-black">
            Generating PDF
          </span>
        </div>
        <div className="justify-self-center mt-10">
          <PuffLoader />
        </div>
      </div> );
}
 
export default GeneratingPDF;