import {
  CSS,
  PageBottom,
  PageBreak,
  PageTop,
  Tailwind
} from "@fileforge/react-print"
import * as React from "react"

import "src/style.css"

export const Document = ({ personal, education, professional }) => {
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
          <span>
            {personal.phone_number} |<span>{personal.email}</span> |
            <span>{personal.linkedin}</span> |<span>{personal.github}</span>
          </span>
        </div>

        {/**Education Section */}
        <div className="mt-2 font-[source-serif]">
          <span>Education</span>
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
                      {item.start_date} - {item.end_date}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/**Experience Section */}
        <div className="mt-2 font-[source-serif]">
          <span>Experience</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="p-2">
            {professional.experience.map((item) => {
              return (
                <div key={item.company}>
                  <div className="flex flex-row justify-between">
                    <span className="font-[600]">{item.company}</span>
                    <span className="">
                      {item.start_date} - {item.end_date}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="">{item.role}</span>
                    <span className="italic">{item.location}</span>
                  </div>
                  {item.description.map((subitem) => subitem.value)}
                </div>
              )
            })}
          </div>
        </div>

        {/**Project Section */}
        <div className="mt-2 font-[source-serif]">
          <span>Project</span>
          <div className="h-[1px] w-full bg-slate-600" />
          <div className="p-2">
            {professional.project.map((item) => {
              return (
                <div key={item.name}>
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-x-2">
                      <span className="font-[600]">{item.name}</span>
                      <span>{item.skills.map((skill) => skill.value)}</span>
                    </div>
                    <span className="">
                      {item.start_date} - {item.end_date}
                    </span>
                  </div>
                  {item.description.map((subitem) => subitem.value)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Tailwind>
  )
}
