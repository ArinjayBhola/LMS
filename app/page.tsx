import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl w-full">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <Image
            src="/knowledge.png"
            alt="knowledge"
            className="-rotate-12 object-contain"
            fill
            sizes="(max-width: 768px) 128px, 160px"
            priority
          />
        </div>

        <div className="text-center flex-1">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-snug tracking-tight">
            AI-Powered <span className="text-primary">Exam Prep</span>
            <br />
            <span>Material Generator</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-2xl max-w-2xl mx-auto">
            Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <Link href={"/dashboard"}>
              <Button size="lg" className="text-lg md:text-xl px-8 py-6 h-auto rounded-xl shadow-lg">
                Get Started →
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <Image
            src="/code.png"
            alt="code"
            className="rotate-12 object-contain"
            fill
            sizes="(max-width: 768px) 128px, 160px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
