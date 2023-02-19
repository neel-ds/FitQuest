import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>FitQuest</title>
        <meta name="description" content="FitQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-5 md:px-0 mx-auto max-w-[1080px] h-[calc(100vh-143px)]">
        <div className="md:text-left flex justify-center flex-row">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-4xl pb-2 text-[#E3FED8]">
                Unleash your potential with
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#35B226] to-[#08EA70] pb-4">
                FitQuest
              </span>
              <span className="block text-[#35B226] font-medium text-2xl">
                Quest of being fit and healthy habits
              </span>
            </h1>
            <p className="mt-3 text-base text-[#E3FED8] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Encourage your fitness goals with ultimate rewards and subscribe
              our plans to smash the new records.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex lg:justify-start md:flex-col lg:flex-row">
              <div>
                <Link
                  href="/plans"
                  className="w-full md:w-[70%] lg:w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-[#08EA70] to-[#35B226] hover:shadow-lg hover:shadow-white/20 transition hover:-translate-y-0.5 hover:delay-100 md:py-2 md:text-lg md:px-8"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex hidden my-auto w-[[30%] md:w-[60%]] items-end">
            <Image src="/fit.png" width="600" height="500" alt="Banner" />
          </div>
        </div>
      </main>
    </>
  );
}
