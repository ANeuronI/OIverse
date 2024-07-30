"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

const model = "Llama_3:70b";

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const input = prompt.trim();
    setPrompt("");

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("Llama 3:70b is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("Done", {
        id: notification,
      });
    }).catch((err) => {
      toast.error(`Error: ${err.message}`, {
        id: notification,
      });
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = 'auto'; // Reset the height
    target.style.height = `${target.scrollHeight}px`; // Set it to the scroll height
    setPrompt(target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) {
        sendMessage(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <div className="z-20">
      <div className="fixed bottom-5 left-[60%] transform -translate-x-1/2 w-[60vw] px-4 z-20">
        <form
          onSubmit={sendMessage}
          className="relative bg-[#2f2f2f] rounded-full flex items-center p-2"
        >
          <textarea
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter Your Prompt"
            className="bg-transparent flex-1 leading-relaxed text-white p-2 rounded-lg outline-none resize-none overflow-y-auto"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '200px' }}
          />
          <button
            type="submit"
            className={`absolute right-3 transition-colors duration-200 ${
              prompt ? "text-white" : "text-[#676767]"
            }`}
          >
            <img
              src="/assets/sent.svg"
              alt="sent"
              className={`h-7 w-7 -rotate-45 ${
                prompt ? "text-white" : "text-[#ffffff]"
              }`}
              style={{ filter: prompt ? "invert(0%)" : "invert(100%)" }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
