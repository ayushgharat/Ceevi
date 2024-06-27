import {
  CSS,
  PageBottom,
  PageBreak,
  PageTop,
  Tailwind
} from "@fileforge/react-print"
import * as React from "react"

import "src/style.css"
import { convertDate } from "~utils/helper/helper"

export const Document = ({ personal, education, professional }) => {
  function removeHttps(link) {
    return link.replace(/^https:\/\//, "")
  }

  return (
    <Tailwind>
      <div>
        <CSS>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap');
          
          @page {
            size: a4;
            margin: 0.5in;
            }
            
            @font-face {
  font-family: "CMU-Roman";
  src: url("/public/font/cmunbx.ttf") format('truetype');
}`}
        </CSS>

        <div className="flex flex-col items-center font-[source-serif]">
          <span className="font-[600] text-center text-3xl">
            {personal.first_name + " " + personal.last_name}
          </span>
          <span className="text-center">
            {personal.phone_number} | <span>{personal.email}</span> |
            <span> {removeHttps(personal.linkedin)}</span> |{" "}
            <span>{removeHttps(personal.github)}</span>
          </span>
        </div>

        {/**Education Section */}
        <div className="mt-2 font-[source-serif]">
          <span className="">EDUCATION</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="p-2">
            {education.map((item) => {
              return (
                <div key={item.name}>
                  <div className="flex flex-row justify-between">
                    <span className="font-[600]">{item.name}</span>
                    <span className="">{item.location}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="italic">
                      {item.degree_level} of {item.major}
                    </span>
                    <span className="italic">
                      {convertDate(item.start_date)} - {convertDate(item.end_date)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/**Experience Section */}
        <div className="mt-2 font-[source-serif]">
          <span>EXPERIENCES</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="pl-2">
            {professional.experience.map((item) => {
              return (
                <div key={item.company} className="mt-1">
                  <div className="flex flex-row justify-between">
                    <span className="font-[600]">{item.company}</span>
                    <span className="">
                      {convertDate(item.start_date)} - {convertDate(item.end_date)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="italic">{item.role}</span>
                    <span className="italic">{item.location}</span>
                  </div>
                  <ul className="list-disc pl-4">
                    {item.description.map((subitem) => {
                      return <li key={subitem.value}>{subitem.value}</li>
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/**Project Section */}
        <div className="mt-2 font-[source-serif]">
          <span>PROJECTS</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="px-2">
            {professional.project.map((item) => {
              return (
                <div key={item.name} className="mt-1">
                  <div className="flex flex-row justify-between">
                    <div className="">
                      <span className="font-[600] me-2">
                        {item.name}
                        {" | "}
                      </span>
                      <span className="italic">
                        {item.skills.map((skill) => skill.value).join(', ')}
                      </span>
                    </div>
                    <span className="">
                      {convertDate(item.start_date)} - {convertDate(item.end_date)}
                    </span>
                  </div>
                  <ul className="list-disc pl-4">
                    {item.description.map((subitem) => {
                      return <li key={subitem.value}>{subitem.value}</li>
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Skills Section */}
        {/**Project Section */}
        <div className="mt-2 font-[source-serif]">
          <span>SKILLS</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="px-2 flex flex-col">
            <span className="font-bold">
              Languages:{" "}
              <span className="font-medium">
                {professional.skill.languages.join(', ')}
              </span>
            </span>

            <span className="font-bold">
              Technologies:{" "}
              <span className="font-medium">
                {professional.skill.technologies.join(', ')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Tailwind>
  )
}
