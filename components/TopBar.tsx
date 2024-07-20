"use client"; // This is a client-side component
import Image from "next/image";
import UserProfile from "./UserProfile";
import Link from 'next/link';
import { signOut } from "next-auth/react";

export default function TopBar() {
  return (
    <nav className="topbar">
    <Link href="/" className="flex items-center gap-4">
      <Image src="/assets/olicon.png" alt="logo" width={28} height={28} />

      <p className="text-2xl max-xs:hidden">OIverse</p>
    </Link>

    <div className="flex items-center gap-1">
        <div className="block md:hidden">   
         <div className="flex items-center">
    <img
        onClick={() => signOut()}
        src="/assets/logout.svg"
        alt="logout"
        width={24}
        height={24}
        className=" h-12 w-12 mx-3.5 hover:cursor-pointer"
      />      
        <UserProfile showName={false} showImage={true} /> 
        </div>
        </div> 
    </div>
</nav>
  );
}
