import Head from 'next/head'
import Title from '@/components/title'
import SubTitle from '@/components/sub-title'
import Image from 'next/image'
import { useToast } from "@chakra-ui/react";
import { bronzeNFTAddress } from '@/utils/contract_address';
import BronzeABI from '../contracts/ABI/bronze_ABI.json';
import { useState, useEffect } from "react";

import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
const Card = ({ title, desc, img, price }) => {
  const { address } = useAccount()

  const toast = useToast();
  console.log(bronzeNFTAddress);
  console.log(address);

  const { config } = usePrepareContractWrite({
    address: bronzeNFTAddress,
    abi: BronzeABI,
    functionName: "mint",
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  });
  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "NFT Minted",
        description: "NFT has been minted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <div className="w-full md:w-1/3 bg-[#E3FED8]/60 rounded overflow-hidden shadow-lg">
      <div className="pt-5">
        <SubTitle title={title} color="dark" />
      </div>
      <div className="flex mx-auto justify-center pt-5 w-28">
        <Image className=" w-full rounded-full h-96 md:h-auto object-cover md:w-48" src={img} width="200" height="200" alt="Icon" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-700 text-center">${price}</div>
        <p className="text-gray-700 text-base">{desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex justify-center pb-5">
          <button

            onClick={() => {
              write?.();
            }}
            className="w-[50%] flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-md text-white bg-[#35B226] hover:drop-shadow-[0_3px_5px_#7d7d7d] md:py-2 md:text-lg md:px-8">Buy</button>
        </div>
      </div>
    </div>
  )
}

function Plans() {

  return (
    <>
      <Head>
        <title>Plans</title>
        <meta name="description" content="FitQuest - Plans" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px] min-h-[calc(100vh-143px)]">
        <div className="md:text-left flex justify-center flex-col pt-[50px]">
          <Title title="Plans" />
          <div className="space-y-2 mt-5">
            <div className="md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
              <Card title="Silver" desc="Exercise and cardio consistently" img="/muscle.png" price={100} />
              <Card title="Gold" desc="More contribution towards wellness" img="/mental-health.png" price={200} />
              <Card title="Platinum" desc="You only live once, do meditation" img="/heart.jpg" price={300} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Plans
