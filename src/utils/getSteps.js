import { useNumberStore } from "@/utils/verify";

export async function getSteps(address) {

    const url = `https://steps-api.up.railway.app/getSteps?walletAddress=${address}`;
    try {
    const data = await fetch(url);
    return await data.json();
    } catch {
      console.log("error")
    }
  }