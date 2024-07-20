import Chat from "@/components/Chat"
import ChatInput from "@/components/ChatInput"

interface Props{
  params:{
    id:string
  }
}

const page = ({params : {id}}:Props) => {
  return (
<div className="mt-10 h-[85%] overflow-hidden flex flex-col">
      {/* chat */}
      <Chat chatId = {id}/>
      {/* chat input */}
      <ChatInput chatId= {id} />
    </div>
  )
}

export default page
