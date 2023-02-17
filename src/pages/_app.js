import { ChakraProvider } from "@chakra-ui/react";
import Header from '@/components/nav-bar'
import Footer from '@/components/footer'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <div className="px-2 sm:px-4 pt-[70px]">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </div>
      <Footer />
    </div>
  )
}
