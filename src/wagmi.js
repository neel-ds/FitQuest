import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'FitQuest',
    chains: [polygonMumbai],
  })
)
