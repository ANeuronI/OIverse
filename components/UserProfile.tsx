"use client"; // This is a client-side component

import { useSession } from "next-auth/react";
interface UserProfileProps {
  showName?: boolean;
  showImage?: boolean;
}
export default function UserProfile( { showName,showImage }: UserProfileProps ) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="user-info flex items-center">
      {showImage && (
      <img
        src={session.user?.image!}
        alt="User Image"
        className="h-12 w-12 rounded-full cursor-pointer mr-2 hover:opacity-50"
      />
      )}

      {showName && session && session.user?.name && (
        <p className="user-name">{session.user.name.split(" ")[0]}</p>
      )}
    </div>
  );
}
