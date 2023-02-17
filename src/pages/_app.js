import Header from "@/components/NavBar";
import Footer from "@/components/footer";
import "@/styles/globals.css";
import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { client } from '../wagmi'

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div className="min-h-[100vh]">
          <Header />
          <div className="px-2 sm:px-4 pt-[70px]">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
