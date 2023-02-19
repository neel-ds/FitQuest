import Head from "next/head";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import GoalCard from "@/components/goal-card";
import { useNumberStore } from "@/utils/verify";
import { useEffect } from "react";
import { getSteps } from "@/utils/getSteps";

function Wellness() {
  const {number, setNumber} = useNumberStore();
  console.log(number);
  useEffect(() => {
    let mounted = true;
    getSteps(number).then((items) => {
      if (mounted) {
        console.log(items);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <>
      <Head>
        <title>Wellness</title>
        <meta name="description" content="FitQuest - Wellness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px] min-h-[calc(100vh-143px)]">
        <div className="md:text-left flex justify-center flex-col pt-[50px]">
          <Title title="Wellness" />
          <div className="space-y-2 mt-5">
            <div className="px-5">
              <div className="flex flex-col md:flex-row md:space-x-5">
                <div className="w-full md:w-1/2 space-y-4">
                  <SubTitle title="Sleep" color="dark" />
                  <GoalCard
                    title="Weekly Sleep Goal"
                    amount={100}
                    type="Hours"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4 mt-5 md:mt-0">
                  <SubTitle title="Wellness" color="dark" />
                  <GoalCard
                    title="Weekly Wellness Goal"
                    amount={100}
                    type="Hours"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Wellness;
