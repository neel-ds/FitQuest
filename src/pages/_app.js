import Header from "@/components/nav-bar";
import Footer from "@/components/footer";
import "@/styles/globals.css";
import { WagmiConfig } from 'wagmi'
import { wagmiClient } from '../utils/wagmi'
// import { client } from '../utils/arcana'
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
        <div className="min-h-[100vh]">
          <Header />
          <div className="px-2 sm:px-4 pt-[70px]">
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </div>
          <Footer />
        </div>
    </WagmiConfig>
  );
}
