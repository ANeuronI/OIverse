import { DocumentData } from "firebase-admin/firestore";

interface Props {
  message: DocumentData;
}

const Message = ({ message }: Props) => {
  const isChatGpt = message.user.name === "GROQ";
  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex flex-col sm:flex-row space-x-5 sm:space-x-5 px-10 max-w-3xl mx-auto items-center mb-5">
        <img
          src={message.user.avatar}
          alt="user profile"
          className="h-8 w-8 rounded-xl hover:opacity-50 cursor-pointer"
        />
        <p className="pt-1 text-sm text-center sm:text-left leading-relaxed">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
