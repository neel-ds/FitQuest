import Head from "next/head";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import {
  silverNFTAddress,
  goldNFTAddress,
  platinumNFTAddress,
} from "@/utils/contract_address";
import BronzeABI from "../contracts/ABI/bronze_ABI.json";
import { useState, useEffect } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

const Card = ({ title, desc, img, price }) => {
  const { address } = useAccount();

  const toast = useToast();

  const { config: silver } = usePrepareContractWrite({
    address: silverNFTAddress,
    abi: BronzeABI,
    functionName: "mint",
  });

  const { data: silverData, write: silverWrite } = useContractWrite(silver);
  const { isSuccess: isSilverSuccess } = useWaitForTransaction({
    hash: silverData?.hash,
  });

  const { config: gold } = usePrepareContractWrite({
    address: goldNFTAddress,
    abi: BronzeABI,
    functionName: "mint",
  });

  const { data: goldData, write: goldWrite } = useContractWrite(gold);
  const { isSuccess: isGoldSuccess } = useWaitForTransaction({
    hash: goldData?.hash,
  });

  const { config: platinum } = usePrepareContractWrite({
    address: platinumNFTAddress,
    abi: BronzeABI,
    functionName: "mint",
  });

  const { data: platinumData, write: platinumWrite } =
    useContractWrite(platinum);
  const { isSuccess: isPlatinumSuccess } = useWaitForTransaction({
    hash: platinumData?.hash,
  });

  useEffect(() => {
    if (isSilverSuccess) {
      toast({
        title: "Silver NFT Minted",
        description: "Silver NFT has been minted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSilverSuccess]);

  useEffect(() => {
    if (isGoldSuccess) {
      toast({
        title: "Gold NFT Minted",
        description: "Gold NFT has been minted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isGoldSuccess]);

  useEffect(() => {
    if (isPlatinumSuccess) {
      toast({
        title: "Platinum NFT Minted",
        description: "Platinum NFT has been minted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isPlatinumSuccess]);

  return (
    <div className="w-full md:w-1/3 bg-gradient-to-b from-[#E3FED8]/80 to-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:drop-shadow-[0_2px_10px_rgba(225,252,228,0.75)] hover:-translate-y-1 transition hover:delay-75">
      <div className="pt-5">
        <SubTitle title={title} color="light" />
      </div>
      <div className="flex mx-auto justify-center pt-5 w-28">
        <Image
          className=" w-full rounded-full h-96 md:h-auto object-cover md:w-48"
          src={img}
          width="700"
          height="700"
          alt="Icon"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-600 text-center">
          {price}
        </div>
        <p className="text-gray-600 text-base text-center">{desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex justify-center pb-5">
          <button
            onClick={() => {
              if (title == "Silver") {
                silverWrite();
              } else if (title == "Gold") {
                goldWrite();
              } else if (title == "Platinum") {
                platinumWrite();
              } else {
                console.log("Incorrect");
              }
            }}
            className="w-[50%] flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-md text-white bg-[#35B226] hover:drop-shadow-[0_2px_3px_#7d7d7d] md:py-2 md:text-lg md:px-8"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

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
            <div className="md:space-x-6 space-y-2 md:space-y-0 flex flex-col md:flex-row">
              <Card
                title="Silver"
                desc="Something is better than nothing"
                img="/silver.png"
                price={"Tier 3"}
              />
              <Card
                title="Gold"
                desc="You got this! Achieve your goals"
                img="/gold.png"
                price={"Tier 2"}
              />
              <Card
                title="Platinum"
                desc="Nail it! Get your super tokens 2x"
                img="/platinum.png"
                price={"Tier 1"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Plans;
