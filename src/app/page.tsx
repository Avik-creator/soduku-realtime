import { StartGameDialog } from "@/components/soduku/startGameDialog";
import { Grid3X3, Users, Zap, Award, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-svh w-full bg-gradient-to-b from-background via-blue-50/30 to-muted/30 dark:from-background dark:via-blue-950/10 dark:to-muted/30 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <div 
            className="inline-block mb-6 py-1 px-4 rounded-full bg-primary/10 text-primary font-medium"
          >
            Challenge Your Mind
          </div>
          
          <h1 
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-primary dark:from-white dark:to-primary"
          >
            Real<span className="text-primary font-black">Time</span> Sudoku
          </h1>
          
          <p 
            className="mx-auto max-w-2xl text-muted-foreground md:text-xl font-light"
          >
            Challenge yourself or compete with friends in this classic number puzzle game.
            Experience the thrill of real-time Sudoku like never before.
          </p>
          
          <div 
            className="mt-10 flex justify-center"
          >
            <a href="#game-start" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <span className="mb-2 text-sm">Get Started</span>
              <ChevronDown className="animate-bounce" />
            </a>
          </div>
        </div>
        
        <div 
          className="grid gap-8 md:grid-cols-3"
        >
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Real-Time Play"
            description="Experience the thrill of solving puzzles with live updates and instant feedback as you play"
          />
          <FeatureCard
            icon={<Grid3X3 className="h-10 w-10 text-primary" />}
            title="Multiple Difficulties"
            description="From beginner to expert, find the perfect challenge to match your skill level and improve"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Multiplayer Mode"
            description="Compete with friends or join random matches to test your speed and Sudoku solving abilities"
          />
        </div>
        
        <div id="game-start" className="relative mt-24 flex justify-center">
          {/* Enhanced decorative grid background */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20">
            <div className="grid grid-cols-9 gap-0.5">
              {Array.from({ length: 81 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded border border-primary/30 transition-all duration-1000"
                  style={{
                    opacity: Math.random() > 0.7 ? 0.8 : 0.2,
                    transform: `scale(${0.8 + Math.random() * 0.4})`,
                  }}
                />
              ))}
            </div>
          </div>
          
          <div 
            className="z-10 rounded-xl bg-card p-8 shadow-lg md:p-10 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
          >
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Ready to Play?</h2>
              <p className="text-muted-foreground">Select your game mode and difficulty to begin your Sudoku journey</p>
            </div>
            <StartGameDialog />
          </div>
        </div>
        
        <div className="mt-28 pb-8 text-center">
          <div className="mb-6 flex justify-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Rules</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RealTime Sudoku. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div 
      className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm group"
    >
      <div className="mb-4 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}