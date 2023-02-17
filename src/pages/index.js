import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>FitQuest</title>
        <meta name="description" content="FitQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px] h-[calc(100vh-143px)]">
        <div className="md:text-left flex justify-center flex-row">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-[#E3FED8]">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#35B226] to-[#E3FED8] pb-4">
              FitQuest
              </span>
              <span className="block text-[#35B226] font-medium text-2xl">
              Lorem Ipsum is simply dummy text
              </span>
            </h1>
            <p className="mt-3 text-base text-[#E3FED8] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex lg:justify-start md:flex-col lg:flex-row">
              <div>
                <Link href="/producthistory" className="w-full md:w-[70%] lg:w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#E3FED8] via-[#35B226] to-[#9FE598] hover:drop-shadow-[0_3px_5px_#7d7d7d] md:py-2 md:text-lg md:px-8"
                  >Explore</Link>
              </div>
            </div>
          </div>
          <div className="md:flex hidden my-auto w-[[30%] md:w-[60%]] items-end">
            <Image src="/fitVector.png" width="600" height="500" alt="Banner" />
          </div>
        </div>
      </main>
    </>
  )
}
