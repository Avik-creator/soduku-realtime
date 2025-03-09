"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { GameDialog } from "./gameDialog";
import { SubmitButton } from "./submit-button";

type NameDialogProps = {
    input: string;
    setInput: (input: string) => void;
    onJoin: () => void;
}

export function JoinGameDialog({
  input,
  setInput,
  onJoin
}: NameDialogProps) {
  const [loadingText, setLoadingText] = useState("Join game")
  const isValid = input.length >= 1
  const isDisabled = !isValid && loadingText === "Joining game..."
  return (
    <GameDialog
      onSubmit={() => {
        setLoadingText("Joining game...")
        onJoin()
      }}
    >
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          placeholder="Enter your name"
          minLength={1}
          id="name"
          type="text"
          required
          value={input}
          className="peer [&:user-invalid:not(:focus)]:border-red-500"
          onChange={(e) => setInput(e.target.value)}
        />
        <p className="hidden text-red-500 text-sm peer-[&:user-invalid:not(:focus)]:block">
          This field is required
        </p>
      </div>
      <SubmitButton loadingText={loadingText} isDisabled={isDisabled} />
    </GameDialog>
  )
}