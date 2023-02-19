import Head from "next/head";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import Image from "next/image";

const Card = ({ title, desc, img, goals }) => {
  return (
    <div className="w-full md:w-1/3 bg-gradient-to-b from-[#E3FED8]/80 to-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:drop-shadow-[0_2px_10px_rgba(225,252,228,0.75)] hover:-translate-y-1 transition hover:delay-100">
      <div className="flex mx-auto justify-center pt-5 w-28">
        <Image
          className=" w-full rounded-full h-96 md:h-auto object-cover md:w-48"
          src={img}
          width="300"
          height="300"
          alt="Icon"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{title}</div>
        <p className="text-gray-700 text-base text-center">{desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <span className="inline-block bg-[#35B226] rounded-full px-3 py-1 text-sm font-semibold text-gray-50 mr-2 mb-2">
          {goals}
        </span>
      </div>
    </div>
  );
};

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
          <SubTitle title="Achievements" color="dark" />
          <div className="space-y-2 mt-5">
            <div className="md:space-x-6 space-y-2 md:space-y-0 flex flex-col md:flex-row">
              <Card
                title="Fitness Freak"
                desc="Exercise and cardio consistently"
                img="/fitFreak.png"
                goals="4x"
              />
              <Card
                title="Mental Care"
                desc="More contribution towards wellness"
                img="/mentalHealth.png"
                goals="2x"
              />
              <Card
                title="YOLO"
                desc="You only live once, do meditation"
                img="/yolo.png"
                goals="5x"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
