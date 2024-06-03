import type { NextApiRequest, NextApiResponse } from "next"

const PDFDocument = require("pdfkit")
const fs = require("fs")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=sample.pdf",
    "Content-Transfer-Encoding": "Binary"
  })

  // const data = req.body;
  // console.log(data)
  // const { experience, projects, skill } = data.data;

  const { personal, professional, education } = {
    personal: {
      first_name: "Ayush",
      last_name: "Gharat",
      email: "gharatayush27@gmail.com",
      phone_number: "4709396771",
      linkedin: "https://linkedin.com/in/ayush-gharat",
      github: "https://github.com/ayushgharat"
    },
    education: [
      {
        name: "Georgia Tech",
        degree_level: "Bachelors",
        major: "Computer Science",
        location: "Atlanta, GA",
        gpa: "4.0",
        start_date: "2022-08",
        end_date: "2026-03"
      },
      {
        name: "Stanford",
        degree_level: "Masters",
        major: "Computer Science",
        location: "Palo Alto",
        gpa: "3.7",
        start_date: "2026-05",
        end_date: "2027-05"
      }
    ],
    professional: {
      project: [
        {
          name: "CeeVi: Chrome Extension",
          skills: ["Next.js", "Plasmo"],
          start_date: "2023-05",
          end_date: "2023-08",
          description:
            "Made a chrome extension that automatically builds a resume",
          location: "Made a chatbo",
          company: "CeeV"
        },
        {
          name: "Aashwas",
          skills: ["Entrepreneurship", "Social Advocacy"],
          start_date: "2023-05",
          end_date: "2023-08",
          description: "Made a social intiative"
        }
      ],
      experience: [
        {
          company: "CSX Tech",
          role: "Technology Intern",
          location: "Jacksonville, Florida",
          start_date: "2024-05",
          end_date: "2024-08",
          description:
            "Made a chatbot. Met cool people. Spent summer in Jacksonville"
        },
        {
          company: "OrangeHealth Labs",
          role: "SWE Intern",
          location: "Bengaluru",
          start_date: "2023-05",
          end_date: "2023-08",
          description: "Made a website for them. Did cool PM stuff. Had fun"
        }
      ],
      skill: {
        languages: ["Java", "Python"],
        technologies: ["VS Code", "Website Development"]
      }
    }
  }

  const doc = new PDFDocument({ size: "A4", margin: 50 })
  doc.pipe(fs.createWriteStream("/file.pdf")) // write to PDF
  doc.pipe(res) // HTTP response

  // add stuff to PDF here using methods described below...

  doc
    .moveUp()
    .font("font/CormorantGaramond-Bold.ttf")
    .fontSize(26)
    .text(personal.first_name + " " + personal.last_name, {
      align: "center"
    })

  doc
    .font("Times-Roman")
    .fontSize(12)
    .text(
      personal.phone_number +
        " | " +
        personal.linkedin +
        " | " +
        personal.email +
        " | " +
        personal.github,
      {
        align: "center"
      }
    )
    .moveDown(1.5)

  // EDUCATION ELEMENT
  doc.font("font/CormorantGaramond-SemiBold.ttf").text("EDUCATION")
  doc.lineWidth(1.5)
  doc.polygon([doc.x, doc.y], [doc.x + 480, doc.y])
  doc.stroke().translate(10, 5)

  for (let i = 0; i < education.length; i++) {
    doc.font("font/CormorantGaramond-Bold.ttf").text(education[i].name)
    doc.moveUp().text(education[i].location, {
      align: "right"
    })
    doc
      .font("font/CormorantGaramond-BoldItalic.ttf")
      .text(education[i].degree_level + " degree in " + education[i].major)
    doc
      .moveUp()
      .text(education[i].start_date + " - " + education[i].start_date, {
        align: "right"
      })
      .moveDown()
  }

  // EXPERIENCES SECTION
  doc.translate(-10, 5)
  doc.font("font/CormorantGaramond-SemiBold.ttf").text("EXPERIENCES")
  doc.lineWidth(1.5)
  doc.polygon([doc.x, doc.y], [doc.x + 480, doc.y])
  doc.stroke().translate(10, 5)

  for (let i = 0; i < professional.experience.length; i++) {
    doc
      .fontSize(12)
      .font("font/CormorantGaramond-Bold.ttf")
      .text(professional.experience[i].role)
    doc
      .fontSize(10)
      .moveUp()
      .text(
        `${professional.experience[i].start_date} - ${professional.experience[i].end_date}`,
        {
          align: "right"
        }
      )
    doc
      .font("font/CormorantGaramond-BoldItalic.ttf")
      .text(professional.experience[i].company)
    doc
      .moveUp()
      .text(professional.experience[i].location, { align: "right" })
      .moveDown()

    doc
      .moveUp()
      .font("font/CormorantGaramond-SemiBold.ttf")
      .list(professional.experience[i].description.split(". "), {
        bulletRadius: 2,
        indent: 15,
        lineGap: 3
      })
      .moveDown()
  }

  // Projects Section
  doc.translate(-10, 5)
  doc.fontSize(12).font("font/CormorantGaramond-SemiBold.ttf").text("PROJECTS")
  doc.lineWidth(1.5)
  doc.polygon([doc.x, doc.y], [doc.x + 480, doc.y])
  doc.stroke().translate(10, 5)

  for (let i = 0; i < professional.project.length; i++) {
    doc
      .fontSize(12)
      .font("font/CormorantGaramond-Bold.ttf")
      .text(
        `${professional.project[i].name} | ${professional.project[i].skills.map((string) => ` ${string}`)}`
      )

    // var textWidth = doc.widthOfString(`${projects[i].Name} | `);
    // doc.moveUp().translate(textWidth, 0);
    // doc
    //   .text(``)
    //   .translate(-textWidth, 0)
    //   .fontSize(10)
    //   .moveUp()
    //   .text("June 2020 - Present", {
    //     align: "right",
    //   });
    // //doc.translate(-textWidth, 0)
    doc
      .font("font/CormorantGaramond-SemiBold.ttf")
      .list(professional.project[i].description.split(". "), {
        bulletRadius: 2,
        indent: 15,
        lineGap: 3
      })
      .moveDown()
  }

  //Technical Skills
  doc.translate(-10, 5)
  doc
    .fontSize(12)
    .font("font/CormorantGaramond-SemiBold.ttf")
    .text("TECHNICAL SKILLS")
  doc.lineWidth(1.5)
  doc.polygon([doc.x, doc.y], [doc.x + 480, doc.y])
  doc.stroke().translate(10, 5)

  doc
    .font("Times-Bold")
    .text(
      "Languages: " + professional.skill.languages.map((string) => ` ${string}`)
    )
  //   textWidth = doc.widthOfString("Languages: ");
  //   doc
  //     .font("Times-Roman")
  //     .moveUp()
  //     .translate(textWidth, 0)
  //     .text()
  //     .translate(-textWidth, 0);

  doc
    .font("Times-Bold")
    .text(
      "Technologies: " +
        professional.skill.technologies.map((string) => ` ${string}`)
    )
  //   textWidth = doc.widthOfString("Technologies: ");
  //   doc
  //     .font("Times-Roman")
  //     .moveUp()
  //     .translate(textWidth, 0)
  //     .text()
  //     .translate(-textWidth, 0);
  //   // finalize the PDF and end the stream
  doc.end()
}
