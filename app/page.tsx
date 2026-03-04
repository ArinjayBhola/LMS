import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background selection:bg-primary/20 selection:text-primary">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 max-w-5xl w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative w-36 h-36 md:w-56 md:h-56 shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl border border-primary/10" />
          <Image
            src="/knowledge.png"
            alt="learning"
            className="object-contain p-4 transition-transform hover:scale-105 duration-500"
            fill
            sizes="(max-width: 768px) 144px, 224px"
            priority
          />
        </div>

        <div className="text-center md:text-left flex-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              AI-Powered <br className="hidden md:block"/>
              Learning Hub
            </h1>
            <p className="text-base md:text-lg font-medium text-muted-foreground max-w-lg leading-relaxed">
              Your intelligent study companion. Generate comprehensive notes, flashcards, and quizzes instantly with the power of AI.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-start">
            <Link href={"/dashboard"}>
              <Button size="lg" className="h-11 px-8 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all font-bold bg-primary text-primary-foreground text-sm tracking-wide">
                Start Learning Free
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-36 h-36 md:w-56 md:h-56 shrink-0 hidden lg:block">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl border border-primary/10" />
          <Image
            src="/code.png"
            alt="coding"
            className="object-contain p-4 transition-transform hover:scale-105 duration-500"
            fill
            sizes="(max-width: 768px) 144px, 224px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
