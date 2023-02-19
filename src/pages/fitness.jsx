import Head from "next/head";
import Link from "next/link";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import GoalCard from "@/components/goal-card";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { useSigner, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { getSteps } from "@/utils/getSteps";

function Fitness() {
  const signer = useSigner();
  const { address } = useAccount();

  const generateBtn = document.getElementById("generate-btn");
  const modal = document.getElementById("myModal");
  const closeModal = document.getElementById("modal-close");
  const randomNumber = document.getElementById("random-number");

  // Function to generate random 6-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  // Event listener for generate button
  generateBtn.addEventListener("click", function () {
    const number = generateRandomNumber();
    randomNumber.textContent = number;
    modal.classList.remove("hidden");
  });

  // Event listener for close
  // Event listener for close button
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // Event listener for clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.classList.add("hidden");
    }
  });

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
    getSteps(address).then((items) => {
      if (mounted) {
        console.log(items);
        // setList(items)
      }
    });
    return () => (mounted = false);
  }, []);

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
              <div className="flex justify-center">
                <button
                  id="generate-btn"
                  class="bg-[#08EA70] text-[#4F4F4F] font-bold py-2.5 px-5 rounded-full hover:shadow-md hover:shadow-[#E3FED8]/30 mt-10"
                >
                  Start journey
                </button>
                <div
                  id="myModal"
                  class="fixed z-10 inset-0 overflow-y-auto hidden"
                >
                  <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    &#8203;
                    <div class="inline-block align-bottom bg-black/80 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                      <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            class="h-6 w-6 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            class="text-lg leading-6 font-medium text-gray-50"
                            id="modal-title"
                          >
                            Verification
                          </h3>
                          <div class="mt-2">
                            <p class="text-sm text-gray-100">
                              Here&apos;s your verification 6-digit number:
                            </p>
                            <p
                              class="text-3xl font-bold text-gray-50"
                              id="random-number"
                            >
                              ...
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#35B226] text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                          id="modal-close"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Fitness;
