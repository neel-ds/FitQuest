import Head from "next/head";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import GoalCard from "@/components/goal-card";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { useSigner, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { getSteps } from "@/utils/getSteps";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNumberStore } from "@/utils/verify";
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'

function Fitness() {
  const signer = useSigner();
  const { address } = useAccount();
  const [randomNumber, setRandomNumber] = useState();
  const { number, setNumber } = useNumberStore();
  const [stepsCount, setStepsCount] = useState(0);
  const steps = stepsCount != 0 ? stepsCount : 1000;
  // Function to generate random 6-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  const { config } = usePrepareSendTransaction({
    request: { to: address, value: ethers.BigNumber.from(1000000000000000) },
  })
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)

  function generateBtn() {
    const rndNumber = generateRandomNumber();
    setRandomNumber(rndNumber);
    setNumber(rndNumber);
    onOpen();
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  async function createIndex() {
    const id = Math.floor(Math.random() * 1000000000);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");
  
    console.log(daix);
  
    try {
      const createIndexOperation = daix.createIndex({
        indexId: id
        // userData?: string
      });
  
      console.log(createIndexOperation);
      console.log(
        `Congrats - you've just created a new Index!
         Network: Goerli
         Super Token: DAIx
         Index ID: ${id}
      `
      );
  
      const result = await createIndexOperation.exec(superSigner);
      console.log(result);
  
      console.log(
        `Congrats - you've just created an index!
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  async function updateSubscription(id, address, shares) {
    await createIndex();
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

  useEffect(() => {
    const getStepsCount = async () => {
      getSteps(number).then((items) => {
        setStepsCount(items?.stepsCount);
        // setList(items)
      });
    };
    getStepsCount();
    const intervalId = setInterval(() => {
      getStepsCount();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  async function distributeFunds(id, amount) {
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
      const distributeOperation = daix.distribute({
        indexId: id,
        amount: amount,
        // userData?: string
      });

      console.log("Distributing...");

      await distributeOperation.exec(signer);

      console.log(
        `Congrats - you've just distributed to an Index!
           Network: Goerli
           Super Token: DAIx
           Index ID: ${id}
           Amount: ${amount}         
        `
      );

      console.log(
        `Congrats - you've just distributed to your index!
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  const getTokens = () => {

  }

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
                    amount={steps}
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
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    sendTransaction();
                  }}
                  class="bg-[#08EA70] text-[#4F4F4F] font-bold py-2.5 px-5 rounded-full hover:shadow-md hover:shadow-[#E3FED8]/30 mt-10"
                >
                  Claim your tokens
                </button>
                <Modal
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <p>Here&apos;s your verification 6-digit number:</p>
                      <p>{randomNumber}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="green" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Fitness;
