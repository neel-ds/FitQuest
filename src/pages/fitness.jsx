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
  Form,
  FormGroup,
  FormControl,
  Spinner,
  Card
} from "react-bootstrap";
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

function Fitness() {
  const signer = useSigner();
  const { address } = useAccount();
  const [randomNumber, setRandomNumber] = useState(0);
  const {number, setNumber} = useNumberStore();
const [stepsCount, setStepsCount] = useState(0);
const steps = stepsCount != 0 ? stepsCount : 1000;
  // Function to generate random 6-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }
  let rndNumber = 0;

  function generateBtn() {
     rndNumber = generateRandomNumber();
    setRandomNumber(rndNumber);
   
    setNumber(rndNumber);
    console.log("randomNumber", rndNumber);
    onOpen();
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  // https://steps-api.up.railway.app/
  async function distributeFunds() {
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
      const distributeOperation = daix.distribute({
        indexId: "129714704",
        amount: "20000"
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
  
  useEffect(() => {
  console.log("scdkd",rndNumber);
   console.log("number is",number);
  // const getStepsCount = async() => { 
  //   getSteps(number).then((items) => {
  //       console.log(items.stepsCount);
  //       setStepsCount(items.stepsCount);        
  //   });}
  // getStepsCount();
  const intervalId = setInterval(() => {
    // getStepsCount()
  }, 30000)
    return () => {clearInterval(intervalId)};
 
   
   
  }, []);

  let account;

  async function updateSubscription(id, address, shares) {
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
      const updateSubscriptionOperation = daix.updateSubscriptionUnits({
        indexId: id,
        subscriber: address,
        units: shares
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
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  function DistributeButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("runs");
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <Head>
        <title>Fitness</title>
        <meta name="description" content="FitQuest - Fitness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {currentAccount === "" ? (
        <button id="connectWallet" className="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <Card className="connectedWallet">
          {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
            38
          )}`}
        </Card>
      )}
      <Form>
       
        <DistributeButton
          onClick={() => {
            setIsButtonLoading(true);
            distributeFunds();
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Distribute Funds
        </DistributeButton>
      </Form>

    
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
                  onClick={generateBtn}
                  class="bg-[#08EA70] text-[#4F4F4F] font-bold py-2.5 px-5 rounded-full hover:shadow-md hover:shadow-[#E3FED8]/30 mt-10"
                >
                  Start journey
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