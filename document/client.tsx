import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer"

import { convertDate } from "~utils/helper/helper"

Font.register({
    family: 'source-serif',
    fonts: [
      {
        src: 'http://fonts.gstatic.com/s/sourceserifpro/v4/CeUM4np2c42DV49nanp55aqQQDHDiKO-LH8MFmRo0b0.ttf',
      },
      {
        src: 'http://fonts.gstatic.com/s/sourceserifpro/v4/CeUM4np2c42DV49nanp55aqQQDHDiKO-LH8MFmRo0b0.ttf',
        fontWeight:600
      }
    ],
  });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  flexCol: {
    flexDirection: "column"
  },
  flexRow: {
    flexDirection: "row"
  },
  itemsCenter: {
    alignItems: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  text3xl: {
    fontSize: 24
  },
  textItalic: {
    fontStyle: "italic"
  },
  font600: {
    fontWeight: 600
  },
  fontBold: {
    fontWeight: "bold"
  },
  fontMedium: {
    fontWeight: "medium"
  },
  mt1: {
    marginTop: 4
  },
  mt2: {
    marginTop: 8
  },
  p2: {
    padding: 8
  },
  pl2: {
    paddingLeft: 8
  },
  pl4: {
    paddingLeft: 16
  },
  px2: {
    paddingHorizontal: 8
  },
  bgSlate600: {
    backgroundColor: "#718096"
  },
  h1px: {
    height: 1
  },
  wFull: {
    width: "100%"
  },
  me2: {
    marginRight: 8
  },
  fontSource: { fontFamily: "source-serif" }
})

// Create Document Component
export const MyDocument = ({ personal, professional, education }) => {
  function removeHttps(link) {
    return link.replace(/^https:\/\//, "")
  }

  return (
    <Document>
      <Page size="A4" style={[styles.page]}>
        <View>
          <View style={[styles.flexCol, styles.itemsCenter, styles.fontSource]}>
            <Text style={[styles.textCenter, styles.text3xl]}>
              {personal.first_name + " " + personal.last_name}
            </Text>
            <Text style={styles.textCenter}>
              {personal.phone_number} | <Text>{personal.email}</Text> |
              <Text> {removeHttps(personal.linkedin)}</Text> |{" "}
              <Text>{removeHttps(personal.github)}</Text>
            </Text>
          </View>

          <View style={[styles.mt2, styles.fontSource]}>
            <Text>EDUCATION</Text>
            <View style={[styles.h1px, styles.wFull, styles.bgSlate600]} />
            <View style={styles.p2}>
              {education.map((item) => (
                <View key={item.name}>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "space-between" }
                    ]}>
                    <Text style={[styles.fontSource]}>{item.name}</Text>
                    <Text>{item.location}</Text>
                  </View>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "space-between" }
                    ]}>
                    <Text style={styles.textItalic}>
                      {item.degree_level} of {item.major}
                    </Text>
                    <Text style={styles.textItalic}>
                      {convertDate(item.start_date)} -{" "}
                      {convertDate(item.end_date)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.mt2, styles.fontSource]}>
            <Text>EXPERIENCES</Text>
            <View style={[styles.h1px, styles.wFull, styles.bgSlate600]} />
            <View style={styles.pl2}>
              {professional.experience.map((item) => (
                <View key={item.company} style={styles.mt1}>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "space-between" }
                    ]}>
                    <Text style={styles.font600}>{item.company}</Text>
                    <Text>
                      {convertDate(item.start_date)} -{" "}
                      {convertDate(item.end_date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "space-between" }
                    ]}>
                    <Text style={styles.textItalic}>{item.role}</Text>
                    <Text style={styles.textItalic}>{item.location}</Text>
                  </View>
                  <View>
                    {item.description.map((subitem) => (
                      <Text key={subitem.value} style={styles.pl4}>
                        • {subitem.value}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.mt2, styles.fontSource]}>
            <Text>PROJECTS</Text>
            <View style={[styles.h1px, styles.wFull, styles.bgSlate600]} />
            <View style={styles.px2}>
              {professional.project.map((item) => (
                <View key={item.name} style={styles.mt1}>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "space-between" }
                    ]}>
                    <View>
                      <Text style={[styles.font600, styles.me2]}>
                        {item.name} {" | "}
                      </Text>
                      <Text style={styles.textItalic}>
                        {item.skills.map((skill) => skill.value).join(", ")}
                      </Text>
                    </View>
                    <Text>
                      {convertDate(item.start_date)} -{" "}
                      {convertDate(item.end_date)}
                    </Text>
                  </View>
                  <View>
                    {item.description.map((subitem) => (
                      <Text key={subitem.value} style={styles.pl4}>
                        • {subitem.value}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.mt2, styles.fontSource]}>
            <Text>SKILLS</Text>
            <View style={[styles.h1px, styles.wFull, styles.bgSlate600]} />
            <View style={[styles.px2, styles.flexCol]}>
              <Text style={styles.fontBold}>
                Languages:{" "}
                <Text style={styles.fontMedium}>
                  {professional.skill.languages.join(", ")}
                </Text>
              </Text>

              <Text style={styles.fontBold}>
                Technologies:
                <Text style={styles.fontMedium}>
                  {professional.skill.technologies.join(", ")}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
