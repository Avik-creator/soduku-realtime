"use client"

import { randomID } from "@/lib/utils"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { DIFFICULTIES } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { GameDialog } from "./gameDialog"
import { SubmitButton } from "./submit-button"
import { AlertTriangle, Award, Brain, CheckCircle, HelpCircle } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function StartGameDialog() {
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [name, setName] = useState("")
  const [loadingText, setLoadingText] = useState("Start game")
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const difficulty = DIFFICULTIES[difficultyIndex]

  const getDifficultyIcon = (diffLevel: string) => {
    switch (diffLevel.toLowerCase()) {
      case "easy":
        return <Brain size={18} className="mr-2 text-green-500" />
      case "medium":
        return <Brain size={18} className="mr-2 text-yellow-500" />
      case "hard":
        return <Brain size={18} className="mr-2 text-orange-500" />
      case "insane":
        return <Brain size={18} className="mr-2 text-red-500" />
      case "inhuman":
        return <Brain size={18} className="mr-2 text-purple-500" />
      default:
        return <Brain size={18} className="mr-2 text-blue-500" />
    }
  }

  const getDifficultyRoast = (diffLevel: string) => {
    switch (diffLevel.toLowerCase()) {
      case "easy":
        return "Still using training wheels, huh? That's cute."
      case "medium":
        return "Ah, the comfort zone of mediocrity. Not too ambitious today?"
      case "hard":
        return "Feeling brave or just delusional? We'll find out soon enough."
      case "insane":
        return "Prepare for pain. Your confidence is about to meet reality."
      case "inhuman":
        return "You're either a genius or a masochist. Either way, good luck."
      default:
        return "Select a difficulty level"
    }
  }

  const getDifficultyColor = (diffLevel: string) => {
    switch (diffLevel.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
      case "hard":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
      case "insane":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
      case "inhuman":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const getDifficultyTrackColor = (diffLevel: string) => {
    switch (diffLevel.toLowerCase()) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-orange-500"
      case "insane":
        return "bg-red-500"
      case "inhuman":
        return "bg-purple-500"
      default:
        return "bg-blue-500"
    }
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !difficulty) return

    setLoadingText("Creating Game...")
    localStorage.setItem("sudoku-name", name)
    const id = randomID(25)

    try {
      const response = await fetch("/api/rooms/", {
        method: "POST",
        body: JSON.stringify({
          id,
          difficulty: difficulty.toLowerCase(),
        }),
      })

      if (response.ok) {
        setLoadingText("Game Created!")
        setShowSuccess(true)

        // Delay navigation for animation
        setTimeout(() => {
          router.push(`/sudoku/${id}`)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      setLoadingText("Error occurred")
    }
  }

  const isDisabled = !name || !difficulty || loadingText !== "Start game"

  return (
    <GameDialog onSubmit={onSubmitHandler}>
      <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-30 dark:bg-blue-600 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200 rounded-full -ml-16 -mb-16 opacity-30 dark:bg-indigo-600 dark:opacity-10"></div>

        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-900 dark:text-white">
          <Award className="inline-block mr-2 mb-1 text-indigo-700 dark:text-indigo-400" /> New Sudoku Game
        </h2>

        <div className="grid gap-4 relative z-10">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-indigo-800 dark:text-slate-200">Player Name</Label>
            <Input
              placeholder="Enter your name"
              minLength={1}
              id="name"
              type="text"
              required
              value={name}
              className="peer w-full px-4 py-2 rounded-md border border-indigo-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white [&:user-invalid:not(:focus)]:border-red-500"
              onChange={(e) => setName(e.target.value)}
            />
            <p className="hidden text-red-500 text-sm peer-[&:user-invalid:not(:focus)]:block flex items-center">
              <AlertTriangle size={14} className="mr-1" /> This field is required
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="difficulty" className="text-sm font-semibold text-indigo-800 dark:text-slate-200">
                Difficulty Level
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center cursor-help">
                      <HelpCircle size={16} className="text-indigo-500 dark:text-slate-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Slide to select your difficulty level</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="px-1">
              {/* Custom slider styling to ensure visibility in light mode */}
              <style jsx global>{`
                .slider-track[data-orientation="horizontal"] {
                  height: 6px !important;
                  background-color: #e4e4e7 !important; /* gray-200 for light mode track */
                }
                .dark .slider-track[data-orientation="horizontal"] {
                  background-color: #3f3f46 !important; /* gray-700 for dark mode track */
                }
                .slider-range[data-orientation="horizontal"] {
                  height: 6px !important;
                }
                .slider-thumb {
                  width: 18px !important;
                  height: 18px !important;
                  border: 2px solid white !important;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
                }
              `}</style>
              <Slider
                defaultValue={[0]}
                max={DIFFICULTIES.length - 1}
                step={1}
                value={[difficultyIndex]}
                onValueChange={(value) => setDifficultyIndex(value[0])}
                className="my-6"
        
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getDifficultyIcon(difficulty)}
                <span className="font-medium text-indigo-900 dark:text-white">{difficulty}</span>
              </div>

              <div 
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)} cursor-help transition-all shadow-sm flex items-center`}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full">
                      {difficulty} Level
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{getDifficultyRoast(difficulty)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {showSuccess ? (
              <div className="flex items-center justify-center p-2 text-green-600 bg-green-100 rounded-md shadow-sm dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="mr-2" size={18} />
                Game created successfully!
              </div>
            ) : (
              <SubmitButton loadingText={loadingText} isDisabled={isDisabled} />
            )}
          </div>
        </div>
      </div>
    </GameDialog>
  )
}