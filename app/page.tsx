import Image from "next/image";
import Link from 'next/link';
import Survey from "@/app/survey/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full  flex-col items-center justify-between ">

        {/* <h1 className="text-4xl font-bold">Baltimore City Survey</h1> */}
        <Survey />
      </main>
    </div>
  );
}
