"use client";

import { randomID } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { DIFFICULTIES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { GameDialog } from "./gameDialog";
import { SubmitButton } from "./submit-button";
import { AlertTriangle, Award, Brain, CheckCircle } from "lucide-react";

export function StartGameDialog(){
    const [difficulty, setDifficulty] = useState("");
  const [name, setName] = useState("");
  const [loadingText, setLoadingText] = useState("Start game");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const getDifficultyIcon = (diffLevel: string) => {
    switch(diffLevel.toLowerCase()) {
      case 'easy': return <Brain size={18} className="mr-2 text-green-500" />;
      case 'medium': return <Brain size={18} className="mr-2 text-yellow-500" />;
      case 'hard': return <Brain size={18} className="mr-2 text-orange-500" />;
      case 'expert': return <Brain size={18} className="mr-2 text-red-500" />;
      default: return <Brain size={18} className="mr-2 text-blue-500" />;
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name || !difficulty) return;
    
    setLoadingText("Creating Game...");
    localStorage.setItem("sudoku-name", name);
    const id = randomID(25);
    
    try {
      const response = await fetch("/api/rooms/", {
        method: "POST",
        body: JSON.stringify({
          id,
          difficulty: difficulty.toLowerCase(),
        })
      });
      
      if(response.ok) {
        setLoadingText("Game Created!");
        setShowSuccess(true);
        
        // Delay navigation for animation
        setTimeout(() => {
          router.push(`/sudoku/${id}`);
        }, 1000);
      }
    } catch(error) {
      console.error(error);
      setLoadingText("Error occurred");
    }
  };

  const isDisabled = !name || !difficulty || loadingText !== "Start game";

  return (
    <GameDialog onSubmit={onSubmitHandler}>
      <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 dark:bg-blue-600 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200 rounded-full -ml-16 -mb-16 opacity-20 dark:bg-indigo-600 dark:opacity-10"></div>
        
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
          <Award className="inline-block mr-2 mb-1" /> New Sudoku Game
        </h2>
        
        <div className="grid gap-4 relative z-10">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">Player Name</Label>
            <Input
              placeholder="Enter your name"
              minLength={1}
              id="name"
              type="text"
              required
              value={name}
              className="peer w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white [&:user-invalid:not(:focus)]:border-red-500"
              onChange={(e) => setName(e.target.value)}
            />
            <p className="hidden text-red-500 text-sm peer-[&:user-invalid:not(:focus)]:block flex items-center">
              <AlertTriangle size={14} className="mr-1" /> This field is required
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="difficulty" className="text-sm font-medium text-slate-700 dark:text-slate-200">Difficulty Level</Label>
            </div>
            <ToggleGroup
              type="single"
              className="grid grid-cols-2 gap-2"
              onValueChange={(type) => setDifficulty(type)}
            >
              {DIFFICULTIES.map((diff) => (
                <ToggleGroupItem
                  key={diff}
                  value={diff}
                  aria-label={`Toggle ${diff}`}
                  className={`w-full py-3 rounded-md transition-all ${
                    difficulty === diff 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {getDifficultyIcon(diff)}
                    {diff}
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <div className="mt-6">
            {showSuccess ? (
              <div className="flex items-center justify-center p-2 text-green-600 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="mr-2" size={18} />
                Game created successfully!
              </div>
            ) : (
              <SubmitButton 
                loadingText={loadingText} 
                isDisabled={isDisabled} 
                
              />
            )}
          </div>
        </div>
      </div>
    </GameDialog>
  );
}