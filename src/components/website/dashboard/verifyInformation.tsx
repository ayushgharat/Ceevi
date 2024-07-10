"use client"

import "core-js/actual"

import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { Document, Outline, Page, pdfjs } from "react-pdf"

import { MyDocument } from "~utils/resume/client"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { PuffLoader } from "react-spinners"
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input"

import EditFields from "./VerifyInformation/editfields"

Promise.resolve(42).then((it) => console.log(it))

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

const VerifyInformation = ({
  resume,
  setResume,
  navigateToJobInfo,
  generatePDF
}) => {
  console.log(resume)

  const [numPages, setNumPages] = useState(null)
  const [resumeOptions, setResumeOptions] = useState({
    name: `${resume.personal.first_name}_${resume.personal.last_name}_Resume`,
    showGithub: true,
    showLinkedin: true
  })

  const handleChange = (e, type, index, descIndex = null) => {
    const { name, value } = e.target
    const updatedResume = { ...resume }

    if (type === "experience") {
      if (descIndex !== null) {
        updatedResume.professional.experience[index].description[
          descIndex
        ].value = value
      } else {
        updatedResume.professional.experience[index][name] = value
      }
    } else if (type === "project") {
      if (descIndex !== null) {
        updatedResume.professional.project[index].description[descIndex].value =
          value
      } else {
        updatedResume.professional.project[index][name] = value
      }
    }

    setResume(updatedResume)
  }

  const handleAddition = (tag, section, index = null) => {
    const updatedResume = { ...resume }
    if (section === "projectSkills" && index !== null) {
      updatedResume.professional.project[index].skills.push({ value: tag.text })
    } else if (section === "languages") {
      updatedResume.professional.skill.languages.push(tag.text)
    } else if (section === "technologies") {
      updatedResume.professional.skill.technologies.push(tag.text)
    }
    setResume(updatedResume)
  }

  const handleDelete = (i, section, index = null) => {
    const updatedResume = { ...resume }
    if (section === "projectSkills" && index !== null) {
      updatedResume.professional.project[index].skills =
        updatedResume.professional.project[index].skills.filter(
          (skill, idx) => idx !== i
        )
    } else if (section === "languages") {
      updatedResume.professional.skill.languages =
        updatedResume.professional.skill.languages.filter(
          (skill, idx) => idx !== i
        )
    } else if (section === "technologies") {
      updatedResume.professional.skill.technologies =
        updatedResume.professional.skill.technologies.filter(
          (skill, idx) => idx !== i
        )
    }
    setResume(updatedResume)
  }

  const handleDrag = (tag, currPos, newPos, section, index = null) => {
    const updatedResume = { ...resume }
    if (section === "projectSkills" && index !== null) {
      const skills = updatedResume.professional.project[index].skills
      skills.splice(currPos, 1)
      skills.splice(newPos, 0, { value: tag.text })
    } else if (section === "languages") {
      const languages = updatedResume.professional.skill.languages
      const [movedItem] = languages.splice(currPos, 1)
      languages.splice(newPos, 0, movedItem)
    } else if (section === "technologies") {
      const technologies = updatedResume.professional.skill.technologies
      const [movedItem] = technologies.splice(currPos, 1)
      technologies.splice(newPos, 0, movedItem)
    }
    setResume(updatedResume)
  }

  const handleDescriptionRemove = (type, index, descIndex) => {
    const updatedResume = { ...resume }
    if (type === "experience") {
      updatedResume.professional.experience[index].description =
        updatedResume.professional.experience[index].description.filter(
          (_, idx) => idx !== descIndex
        )
    } else if (type === "project") {
      updatedResume.professional.project[index].description =
        updatedResume.professional.project[index].description.filter(
          (_, idx) => idx !== descIndex
        )
    }
    setResume(updatedResume)
  }

  const handleDescriptionAdd = (type, index) => {
    const updatedResume = { ...resume }
    if (type === "experience") {
      updatedResume.professional.experience[index].description.push({
        value: ""
      })
    } else if (type === "project") {
      updatedResume.professional.project[index].description.push({ value: "" })
    }
    setResume(updatedResume)
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }): void {
    setNumPages(nextNumPages)
  }

  return (
    <div className="bg-white relative h-full w-fit overflow-x-scroll overflow-y-clip rounded-3xl grid grid-cols-2 xl:gap-x-10">
      <div className="flex flex-col overflow-y-scroll h-auto pt-3 px-3">
        <EditFields
          navigateToJobInfo={navigateToJobInfo}
          handleAddition={handleAddition}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleDescriptionAdd={handleDescriptionAdd}
          handleDescriptionRemove={handleDescriptionRemove}
          handleDrag={handleDrag}
          resume={resume}
          resumeOptions={resumeOptions}
          setResumeOptions={setResumeOptions}
        />
        {/* <button onClick={generatePDF} className="PrimaryButton">
        Generate PDF
      </button> */}
        <PDFDownloadLink
          fileName={resumeOptions.name}
          document={
            <MyDocument
              personal={resume.personal}
              professional={resume.professional}
              education={resume.education}
              resumeOptions={resumeOptions}
            />
          }
          className="PrimaryButton text-center p-5 m-2">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </div>

      <div className="flex flex-col relative overflow-y-scroll h-auto pt-5">
        {/* <div className="p-[14mm]  overflow-x-scroll border-2 border-black overflow-y-scroll">
            <Document
              personal={resume.personal}
              professional={resume.professional}
              education={resume.education}
            />
            
          </div>
           */}

        <div className="flex flex-col bg-slate-700 min-w-[210mm] w-[210mm] overflow-scroll">
          <BlobProvider
            document={
              <MyDocument
                personal={resume.personal}
                professional={resume.professional}
                education={resume.education}
                resumeOptions={resumeOptions}
              />
            }>
            {({ blob, url, loading, error }) => {
              // Do whatever you need with blob here

              return (
                <Document
                  file={url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <Document
                      file={url}
                      className={`${loading && "opacity-35"}`}>
                      <Page
                        pageNumber={1}
                        canvasBackground="bg-red-600"
                        scale={1}
                        className="flex flex-col justify-center items-center"
                      />
                    </Document>
                  }
                  className={`mt-4 ${loading && "opacity-35"}`}>
                  {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => (
                      <Page
                        pageNumber={page}
                        canvasBackground="bg-red-600"
                        scale={1}
                        className="mt-5 flex flex-col justify-center items-center"
                      />
                    ))}
                </Document>
              )
            }}
          </BlobProvider>
        </div>
      </div>
    </div>
  )
}

export default VerifyInformation
