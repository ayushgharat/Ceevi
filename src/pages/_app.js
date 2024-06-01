import "./../style.css"

import { ChakraProvider } from "@chakra-ui/react"
import { Inter } from "next/font/google"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const inter = Inter({ subsets: ["latin"] })

export default function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </DndProvider>
  )
}
