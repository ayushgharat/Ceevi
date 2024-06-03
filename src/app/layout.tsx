import "./../style.css"

import { ChakraProvider } from "@chakra-ui/react"
import { Inter } from "next/font/google"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <DndProvider backend={HTML5Backend}>
        
      </DndProvider> */}

      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
