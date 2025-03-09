"use client";

import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import {ReactNode, useEffect, useState} from "react";
import { JoinGameDialog } from "./joinGame";

type RoomProps = {
    roomId: string;
    children: ReactNode;
}

const initialStorage = {
    time: 0,
  isRunning: false,
  isSolved: false,
  sudoku: new LiveList([]),
  mistakeCount: 0,
  validateMode: false,
  undoHistory: new LiveList([]),
  redoHistory: new LiveList([]),
  messages: new LiveList([]),
  confettiOptions: new LiveObject({ x: null, y: null })
}

export function LiveBlocksRoom({ roomId, children }: RoomProps) {
    const [name, setName] = useState<string>("");
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
    const storedName = localStorage.getItem("sudoku-name")
    if (storedName) {
      setName(storedName)
    } else {
      setShowDialog(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = () => {
    if(name.trim() === "") return;
    localStorage.setItem("sudoku-name", name);
    setShowDialog(false);
    setName(name);
  }

  if(isLoading) return null;

  if(showDialog){
    return (
        <JoinGameDialog
            input={name}
            setInput={setName}
            onJoin={handleSubmit}
        />
    )
  }

  const loading = (
    <div className="flex h-full items-center justify-center gap-1">
      Joining game
      <div className="animate-bounce [animation-delay:-0.3s]">.</div>
      <div className="animate-bounce [animation-delay:-0.13s]">.</div>
      <div className="animate-bounce">.</div>
    </div>
  )

  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          body: JSON.stringify({ room, name })
        })
        return await response.json()
      }}
    >
      <RoomProvider
        initialPresence={{ focusIndex: null, isTyping: false }}
        id={roomId}
        initialStorage={initialStorage}
      >
        <ClientSideSuspense fallback={loading}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}