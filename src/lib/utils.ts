import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {getSudoku} from "./soduku";
import { LiveList, LiveObject } from "@liveblocks/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomID = (count: number) => {
  return "x".repeat(count).replace(/x/g, () => (Math.random() * 16 | 0).toString(16))
}

export const generateSoduku = (difficulty: string) => {
  const sodukuGame = getSudoku();
  const sodukuGeneratedArray = sodukuGame.generate(difficulty);
  const solve: any = sodukuGame.solve(sodukuGeneratedArray);
  const sodukuGrid = new LiveList<Cell>([]);

  sodukuGeneratedArray.split("").forEach((value: string, index: number) => {
    const square = new LiveObject({
      value: value === "." ? 0 : Number(value),
      immutable: value === "." ? false : true,
      valid: value === "." ? false : true,
      key: value === "." ? Number(sodukuGrid[index]) : Number(value)
    })
    sodukuGrid.push(square)
  })

  return sodukuGrid;

}

