"use client"
import Image from "next/image";
import vercel from "@/public/assets/ollamaicon.png";
import UserProfile from "@/components/UserProfile";
import NewChat from "@/components/NewChat";

export default function Home() {
  return (
    <main className="relative flex flex-col h-screen px-2 text-slate-50 justify-center">
      <div className="flex flex-col space-x-5 ">
        <div className="flex items-center text-center">
          <Image
            src={vercel}
            alt=""
            width={56}
            height={56}
            className="ml-5 mb-2"
          />
          <h1>
            <UserProfile showName showImage={false} />
          </h1>
        </div>
        <p className="text-slate-400 font-medium text-2xl mb-5 pb-5">
          how can i help you today
        </p>
      </div>
      <div className="flex flex-row mb-25px">
        <div className="infotext w-[250px]">
          <h2> give me an idea</h2>
        </div>
        <div className="infotext w-[250px]">
          <h2>tell me a fun fact</h2>
        </div>
        <div className="infotext w-[250px]">
          <h2> tell me a joke</h2>
        </div>
      </div>

      <div className="absolute bottom-0 left-20 w-[60vw] mb-4">
        <NewChat />
      </div>
    </main>
  );
}
