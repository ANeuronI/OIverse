"use client"
import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat"
import UserProfile from "./UserProfile";
import { collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";


const SideBar = () => {
  
    const { data: session } = useSession();
  
    const [chats, loading, error] = useCollection(
      session && collection(db, "users", session.user?.email!, "chats")
    );
  return (
    <div className="flex flex-col h-screen md:min-w-26px">
    <div className="flex-1">
            {/* New Chat */}
             < NewChat />
             {/* map the chats to display it  */}
              {chats?.docs.map(chats=>(
                <ChatRow key={chats.id} id = {chats.id} />
              ))}
    </div>
    <div className="flex items-center">
    <img
        onClick={() => signOut()}
        src="/assets/logout.svg"
        alt="logout"
        width={24}
        height={24}
        className=" h-12 w-12 mx-3.5 hover:cursor-pointer"
      />
    <UserProfile showName showImage />
    </div>
    </div>
  )
}

export default SideBar
