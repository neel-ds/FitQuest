import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ArcanaConnector } from "@arcana/auth-wagmi"

const arcana_app_address = "92ed0865eadd5821c028a0bfb2604eda24d341f8";
const connector = new ArcanaConnector({
  chains: [polygonMumbai],
  options: {
    appId: `${arcana_app_address}`, // appId = App Address
    theme: 'light',            // Defaults to 'dark'
    alwaysVisible: false,      // Defaults to true
    position: 'left'           // Defaults to 'right'
  },
})

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: connector(chains),
  provider,
});
