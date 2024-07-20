"use client";

import Image from "next/image";
import plus from "@/public/assets/plus.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const docs = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push("/chats/${doc.id}");
  };


  return (
    <div>
      <div onClick={createNewChat} className="flex flex-row chatrow my-5 space-x-3">
        <p>New Chat</p>
        <Image
          src={plus}
          alt="newchat"
          width={24}
          height={24}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NewChat;
