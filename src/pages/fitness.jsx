import Head from "next/head";
import Link from "next/link";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import GoalCard from "@/components/goal-card";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import {useSigner,useAccount} from "wagmi";
import { useState, useEffect } from "react";
import { getSteps } from '@/utils/getSteps';


function Fitness() {
  const signer = useSigner();
  const { address } = useAccount();

  
  // https://steps-api.up.railway.app/
  async function updateSubscription(id, address, shares) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");

    console.log(daix);

    try {
      const updateSubscriptionOperation = daix.updateSubscriptionUnits({
        indexId: id,
        subscriber: address,
        units: shares,
        // userData?: string
      });

      console.log("Updating your Index...");

      await updateSubscriptionOperation.exec(signer);

      console.log(
        `Congrats - you've just updated an Index!
           Network: Goerli
           Super Token: DAIx
           Index ID: ${id}
           Subscriber: ${address}
           Units: ${shares} units
           
        `
      );

      console.log(
        `Congrats - you've just updated your index!
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
  let steps = {};
  async function getStaticProps() {
    const url = `https://steps-api.up.railway.app/getSteps?walletAddress=${address}`;
    const res = await fetch(url);
    // steps = await res.json();
  console.log(res);
    return res;
  }
  useEffect(() => {
    let mounted = true;
    getSteps(address)
      .then(items => {
        if(mounted) {
          console.log(items);
          // setList(items)
        }
      })
    return () => mounted = false;
  }, [])
 

  return (
    <>
      <Head>
        <title>Fitness</title>
        <meta name="description" content="FitQuest - Fitness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px] min-h-[calc(100vh-143px)]">
        <div className="md:text-left flex justify-center flex-col pt-[50px]">
          <Title title="Fitness" />
          <div className="space-y-2 mt-5">
            <div className="px-5">
              <div className="flex flex-col md:flex-row md:space-x-5">
                <div className="w-full md:w-1/2 space-y-4">
                  <SubTitle title="Steps" color="dark" />
                  <GoalCard
                    title="Weekly Steps Goal"
                    amount={100}
                    type="Steps"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4 mt-5 md:mt-0">
                  <SubTitle title="Calories" color="dark" />
                  <GoalCard
                    title="Weekly Calories Goal"
                    amount={100}
                    type="Calories"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    updateSubscription(
                      "607204514",
                      "0xb814E0Dcc9dfBb5e242CbbFe367b7C59C9E9a6B0",
                      100
                    )
                  }
                  className="bg-[#08EA70] text-[#4F4F4F] font-bold py-2.5 px-5 rounded-full hover:shadow-md hover:shadow-[#E3FED8]/30 mt-10"
                >
                  Join League
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Fitness;
