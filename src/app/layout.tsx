import "./../style.css"

import { ChakraProvider } from "@chakra-ui/react"
import { DM_Sans, Poppins } from "next/font/google"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

//const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins"
})
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dm_sans.variable}`}>
      {/* <DndProvider backend={HTML5Backend}>
        
      </DndProvider> */}

      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
