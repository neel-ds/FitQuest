
export async function getSteps(address) {
    // const url = `https://steps-api.up.railway.app/getSteps?walletAddress=${address}`;
    
    const data = await fetch("https://steps-api.up.railway.app/getSteps?walletAddress=0x60F6Ae4324e83E9C767A13cae1B9C54A658D16d3");
    return await data.json();
  }