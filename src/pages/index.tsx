import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>FitQuest</title>
        <meta name="description" content="FitQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline text-red-300">
          Hello world!
        </h1>        
      </main>
    </>
  )
}
