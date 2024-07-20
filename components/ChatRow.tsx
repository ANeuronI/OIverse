import { db } from "@/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

interface Props {
  id: string;
}

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removechat = async()=>{
    await deleteDoc(doc(db,'users',session?.user?.email!,'chats',id))
    router.push('/')
  }
  return (
    <Link
      href={`/chats/${id}`}
      className={`chatRow flex items-center justify-between p-2 transition-all duration-200 hover:bg-[#1f1f1f] rounded-md ${
        active && 'bg-[#1f1f1f] hover:bg-[#1f1f1f]' }`}>
      <p className="flex-1 truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <button onClick={removechat} className="relative ml-2 p-1 rounded-lg transition-all duration-200 hover:bg-gray-800" >
        <img src="/assets/menu.svg" alt="menu" className="h-5 w-5" />
      </button>
    </Link>
  );
};

export default ChatRow;
