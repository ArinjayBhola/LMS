import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4 md:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl w-full relative z-10">
        {/* Left Icon */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 animate-in fade-in zoom-in duration-700 delay-100 hidden md:block">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <Image
            src="/knowledge.png"
            alt="knowledge"
            className="-rotate-12 object-contain drop-shadow-xl hover:scale-110 transition-transform duration-300"
            fill
            sizes="(max-width: 768px) 96px, 128px"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="text-center flex-1 space-y-8">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              AI-Powered Learning
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Exams
              </span>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Generate comprehensive study materials, quizzes, and summaries instantly with our advanced AI engine.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href={"/dashboard"}>
              <Button size="lg" className="text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto rounded-full border-2 hover:bg-accent/10 w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Icon */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 animate-in fade-in zoom-in duration-700 delay-100 hidden md:block">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
          <Image
            src="/code.png"
            alt="code"
            className="rotate-12 object-contain drop-shadow-xl hover:scale-110 transition-transform duration-300"
            fill
            sizes="(max-width: 768px) 96px, 128px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
