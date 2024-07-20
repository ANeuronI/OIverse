import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession, Session } from "next-auth";
import Login from "@/components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TopBar from "@/components/TopBar";
import ClientProvider from "@/components/ClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OIVERSE",
  description: "The NEXT OIVERSE APPLICATION POWERED BY GPT",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={ session } >

          {!session ? (
            <Login />
          ):(

            <main className="flex">
              <div className= " bg-[#0f0f0f] h-screen w-[15%] max-w-[581px] overflow-y-auto md:min-w-[20rem]">
               < SideBar />
               </div>
              <ClientProvider />
              <section className="bg-[#131313] max-h-screen flex-1 w-full ">
              <TopBar />
                {children}
              </section>
            </main>
          )}

            </SessionProvider>
            </body>
        </html>
  );
}
