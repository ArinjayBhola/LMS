import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-black h-screen px-6">
      <div className="flex items-center justify-center gap-12">
        <Image
          src="/knowledge.png"
          alt="knowledge"
          className="-rotate-12"
          width={140}
          height={140}
        />

        <div className="text-center">
          <h1 className="text-7xl font-bold leading-snug">
            AI-Powered <span className="text-blue-600">Exam Prep</span>
            <br />
            <span>Material Generator</span>
          </h1>
          <p className="text-gray-600 mt-4 text-2xl">
            Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <Link href={"/dashboard"}>
              <Button className="bg-blue-600 text-white p-8 text-2xl rounded-xl shadow-lg">Get Started →</Button>
            </Link>
          </div>
        </div>

        <Image
          src="/code.png"
          alt="code"
          className="rotate-12"
          width={140}
          height={140}
        />
      </div>
    </div>
  );
}
