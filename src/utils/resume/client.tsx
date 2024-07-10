import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer"
import React from "react"

import { convertDate } from "~utils/helper/helper"

const semiboldFont = `${process.env.NEXT_PUBLIC_DOMAIN}/fonts/cmunbx.ttf`

Font.register({
  family: "source-serif",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/sourceserifpro/v4/CeUM4np2c42DV49nanp55aqQQDHDiKO-LH8MFmRo0b0.ttf"
    }
  ]
})

Font.register({
  family: "cormorant",
  fonts: [
    {
      src: `/font/cmunbx.ttf`
    }
  ]
})

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 20
  },
  name: {
    fontFamily: "cormorant",
    fontSize: 26,
    textAlign: "center"
  },
  personal_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  personal_details: {
    fontFamily: "source-serif",
    textAlign: "center",
    fontSize: 10
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20
  },
  title: {
    fontFamily: "cormorant",
    fontSize: 12
  },
  item_layout: {
    display: "flex",
    flexDirection: "column",
    marginTop: 7
  },
  divider: {
    backgroundColor: "#000",
    height: 2
  },
  heading_layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "cormorant",
    fontSize: 12,
    fontWeight: 600
  },
  subheading_layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "source-serif",
    fontSize: 10,
    fontWeight: 600,
    marginTop: 1
    // fontStyle: "italic"
  },
  description_layout: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "source-serif",
    fontSize: 10,
    marginTop: 1
  },
  skill_heading: {
    fontFamily: "source-serif",
    fontWeight: 600,
    fontSize: 10
  },
  skill_items: {
    fontWeight: 500,
    fontSize: 10
  }
})

// Create Document Component
export const MyDocument = ({
  personal,
  professional,
  education,
  resumeOptions
}) => {
  function removeHttps(link) {
    return link.replace(/^https:\/\//, "")
  }

  console.log(resumeOptions)

  return (
    <Document style={{ backgroundColor: "#000000" }}>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.personal_container}>
            <Text style={styles.name}>
              {personal.first_name + " " + personal.last_name}
            </Text>
            <Text style={styles.personal_details}>
              {personal.phone_number} | <Text>{personal.email}</Text>
              {resumeOptions.showLinkedin && (
                <Text>
                  {" | "}
                  {removeHttps(personal.linkedin)}
                </Text>
              )}
              {resumeOptions.showGithub && (
                <Text>
                  {" | "}
                  {removeHttps(personal.github)}
                </Text>
              )}
            </Text>
          </View>

          {professional.education && <View style={styles.container}>
            <Text style={styles.title}>EDUCATION</Text>
            <View style={styles.divider} />
            <View>
              {education.map((item) => (
                <View key={item.name} style={styles.item_layout}>
                  <View style={styles.heading_layout}>
                    <Text>{item.name}</Text>
                    <Text>{item.location}</Text>
                  </View>
                  <View style={styles.subheading_layout}>
                    <Text>
                      {item.degree_level} of {item.major}
                    </Text>
                    <Text>
                      {convertDate(item.start_date)} -{" "}
                      {convertDate(item.end_date)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>}

          {professional.experience && <View style={styles.container}>
            <Text style={styles.title}>EXPERIENCES</Text>
            <View style={styles.divider} />
            <View>
              {professional.experience.map((item) => (
                <View key={item.company} style={styles.item_layout}>
                  <View style={styles.heading_layout}>
                    <Text>{item.company}</Text>
                    <Text>
                      {convertDate(item.start_date)} -{" "}
                      {convertDate(item.end_date)}
                    </Text>
                  </View>
                  <View style={styles.subheading_layout}>
                    <Text>{item.role}</Text>
                    <Text>{item.location}</Text>
                  </View>
                  <View style={styles.description_layout}>
                    {item.description.map((subitem) => (
                      <Text key={subitem.value}>• {subitem.value}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>}

          {professional.project && <View style={styles.container}>
            <Text style={styles.title}>PROJECTS</Text>
            <View style={styles.divider} />
            <View>
              {professional.project.map((item) => (
                <View key={item.name} style={styles.item_layout}>
                  <View style={styles.heading_layout}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text>
                        {item.name}
                        {" | "}
                      </Text>
                      <Text style={{ fontFamily: "source-serif" }}>
                        {item.skills.map((skill) => skill.value).join(", ")}
                      </Text>
                    </View>
                    <Text>
                      {convertDate(item.start_date)}
                    </Text>
                  </View>
                  <View style={styles.description_layout}>
                    {item.description.map((subitem) => (
                      <Text key={subitem.value}>• {subitem.value}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>}

          {professional.skill && <View style={styles.container}>
            <Text style={styles.title}>SKILLS</Text>
            <View style={styles.divider} />
            <View style={styles.description_layout}>
              <Text style={styles.skill_heading}>
                Languages:{" "}
                <Text style={styles.skill_items}>
                  {professional.skill.languages.join(", ")}
                </Text>
              </Text>

              <Text style={styles.skill_heading}>
                Technologies:
                <Text style={styles.skill_items}>
                  {professional.skill.technologies.join(", ")}
                </Text>
              </Text>
            </View>
          </View>}
        </View>
      </Page>
    </Document>
  )
}
