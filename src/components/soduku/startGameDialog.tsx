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

export function StartGameDialog(){
    const [difficulty, setDifficulty] = useState("");
    const [name, setName] = useState("");
    const [loadingText, setLoadingText] = useState("Start game");

    const router = useRouter();




    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !difficulty) return;
        setLoadingText("Creating Game.......");
        localStorage.setItem("sudoku-name", name);

        const id = randomID(25);
        try{
            const response = await fetch("/api/rooms/", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    difficulty: difficulty.toLowerCase(),
                })
            })

            if(response.ok){
                setLoadingText("Game Created");
                router.push(`/sudoku/${id}`);
            }
        }catch(error){
            console.error(error);
        }
    }

    const isDisabled = !name || !difficulty || loadingText !== "Start game";

    return (
       <GameDialog onSubmit={onSubmitHandler}>
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          placeholder="Enter your name"
          minLength={1}
          id="name"
          type="text"
          required
          value={name}
          className="peer [&:user-invalid:not(:focus)]:border-red-500"
          onChange={(e) => setName(e.target.value)}
        />
        <p className="hidden text-red-500 text-sm peer-[&:user-invalid:not(:focus)]:block">
          This field is required
        </p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Difficulty</Label>
        </div>
        <ToggleGroup
          type="single"
          className="w-full flex-col items-start"
          onValueChange={(type) => setDifficulty(type)}
        >
          {DIFFICULTIES.map((difficulty) => (
            <ToggleGroupItem
              key={difficulty}
              value={difficulty}
              aria-label={`Toggle ${difficulty}`}
              className="w-full"
            >
              {difficulty}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <SubmitButton loadingText={loadingText} isDisabled={isDisabled} />
    </GameDialog>
    )

}