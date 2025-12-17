import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-6xl w-full z-10">
        <div className="relative w-40 h-40 md:w-64 md:h-64 shrink-0 animate-float" style={{ animationDelay: '0s' }}>
          <Image
            src="/knowledge.png"
            alt="knowledge"
            className="-rotate-12 object-contain drop-shadow-2xl"
            fill
            sizes="(max-width: 768px) 160px, 256px"
            priority
          />
        </div>

        <div className="text-center flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter">
              AI-Powered <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">Exam Prep</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your AI Companion. <br/>
              <span className="font-medium text-foreground">Effortless Study Material</span> at Your Fingertips.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href={"/dashboard"}>
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-40 h-40 md:w-64 md:h-64 shrink-0 animate-float" style={{ animationDelay: '2s' }}>
          <Image
            src="/code.png"
            alt="code"
            className="rotate-12 object-contain drop-shadow-2xl"
            fill
            sizes="(max-width: 768px) 160px, 256px"
            priority
          />
        </div>
      </div>
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}
