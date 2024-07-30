"use client";
import Image from "next/image";
import vercel from "@/public/assets/ollamaicon.png";
import UserProfile from "@/components/UserProfile";
import NewChat from "@/components/NewChat";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleTextClick = useCallback(async (message: string) => {
    if (!session) return;

    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    const newChatId = doc.id;

    const notification = toast.loading("Llama 3:70b is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
        chatId: newChatId,
        model: "Llama_3:70b",
        session,
      }),
    }).then(() => {
      toast.success("Done", {
        id: notification,
      });
      router.push(`/chats/${newChatId}`);
    });
  }, [session, router]);

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
          how can I help you today
        </p>
      </div>
      <div className="flex flex-row mb-25px">
        <div className="infotext w-[250px]  hover:bg-[#383838] hover:cursor-pointer" onClick={() => handleTextClick("give me an idea")}>
          <h2> Give me an idea</h2>
        </div>
        <div className="infotext w-[250px]  hover:bg-[#383838] hover:cursor-pointer" onClick={() => handleTextClick("tell me a fun fact")}>
          <h2> Tell me a fun fact</h2>
        </div>
        <div className="infotext w-[250px]  hover:bg-[#383838] hover:cursor-pointer " onClick={() => handleTextClick("tell me a joke")}>
          <h2> Tell me a joke</h2>
        </div>
      </div>
      <div className="absolute bottom-0 left-20 w-[60vw] mb-4">
        <NewChat />
      </div>
    </main>
  );
}
