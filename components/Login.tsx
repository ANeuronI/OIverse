"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import ollamaicon from "@/public/assets/ollamaicon.png"

function Login( ) {
    return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
        <Image src={ollamaicon} alt="logo" width={200} height={200}/>

        <button onClick={()=>signIn("google")} className="text-white font-bold text-2xl animate-pulse">Sign-in to authenticate</button>
    </div> 
    )
}

export default Login