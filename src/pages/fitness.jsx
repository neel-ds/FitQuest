import Head from 'next/head'
import Title from '@/components/title'
import SubTitle from '@/components/sub-title'
import GoalCard from '@/components/goal-card'

function Fitness() {
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
                <SubTitle title='Steps' color="dark" />
                <GoalCard title="Weekly Steps Goal" amount={100} type="Steps" />
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-5 md:mt-0">
                <SubTitle title='Calories' color="dark" />
                <GoalCard title="Weekly Calories Goal" amount={100} type="Calories" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  )
}

export default Fitness
