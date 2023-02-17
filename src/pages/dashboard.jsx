import Head from 'next/head'
import Title from '@/components/title'
import SubTitle from '@/components/sub-title'
import Image from 'next/image'

const Card = ({ title, desc, img, goals }) => {
  return (
    <div className="w-full md:w-1/3 bg-[#E3FED8] rounded overflow-hidden shadow-lg">
      <div className="flex mx-auto justify-center pt-5 w-28">
        <Image className=" w-full rounded-full h-96 md:h-auto object-cover md:w-48" src={img} width="200" height="200" alt="Icon" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {
          goals.map(goal => <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={goal}>{goal}</span>)
        }
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <>
    <Head>
      <title>Dashboard</title>
      <meta name="description" content="FitQuest - Dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="px-4 md:px-0 mx-auto max-w-[1080px] min-h-[calc(100vh-143px)]">
      <div className="md:text-left flex justify-center flex-col pt-[50px]">
        <Title title="Dashboard" />
        <SubTitle title='Achievements' />
        <div className="space-y-2 mt-5">
          <div className="md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
            <Card title="Fitness Freak" desc="Exercise and cardio consistently" img="/muscle.png" goals={["3"]} />
            <Card title="Mental Care" desc="More contribution towards wellness" img="/mental-health.png" goals={["6"]} />
            <Card title="YOLO" desc="You only live once, do meditation" img="/heart.jpg" goals={["4"]} />
          </div>
        </div>
      </div>
    </main>
  </>
  )
}

export default Dashboard
