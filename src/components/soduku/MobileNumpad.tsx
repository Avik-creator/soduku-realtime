"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { LiveList, LiveObject } from "@liveblocks/client"
import { useMutation, useStorage } from "@liveblocks/react/suspense"
import confetti from "canvas-confetti"

import { useContext } from "react"
import { NotesContext } from "@/context/notesProvider"
import { TableCellContext } from "@/context/tableCellContext"

type SelectNumProps = {
  numPad: number | null
  index: number | null
}

export const MobileNumpad = () => {
  const { tableCell, onClickTableCell } = useContext(TableCellContext)
  const { notesMode } = useContext(NotesContext)

  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return

    const sudoku = storage.get("sudoku")
    const undoHistory = storage.get("undoHistory")

    if (sudoku.get(index)?.get("immutable") === true) return

    let currentValue = sudoku?.get(index)?.get("value")
    if (currentValue === undefined) return

    if (typeof currentValue === "object" && currentValue !== null) {
      currentValue = currentValue.clone()
    }

    const history = new LiveObject<HistoryStack>({
      index,
      valueBefore: currentValue,
      valueAfter: 0,
      mode: "erase"
    })
    undoHistory.push(history)

    sudoku.get(index)?.update({
      value: 0,
      valid: false
    })
  }, [])

  const selectNum = useMutation(
    ({ storage }, { numPad, index }: SelectNumProps) => {
      if (index === null || numPad === null) return
      const sudoku = storage?.get("sudoku")

      if (sudoku.get(index)?.get("immutable") === true) {
        return
      }
      onClickTableCell({ value: numPad, index })

      let currentValue = sudoku?.get(index)?.get("value")

      if (currentValue === undefined || currentValue === null) return

      //Toggle number if already present
      if (currentValue === numPad) {
        sudoku.get(index)?.set("value", 0)
        return
      }

      const redoHistory = storage.get("redoHistory")
      const undoHistory = storage.get("undoHistory")

      if (redoHistory.length > 0) {
        redoHistory.clear()
      }

      const cell = sudoku.get(index!)
      const valid = cell?.get("key") === numPad

      if (!valid) {
        storage.set("mistakeCount", storage.get("mistakeCount") + 1)
      }

      cell?.update({ value: numPad, valid })

      const isGameSolved = sudoku.every((cell) => cell.get("valid") === true)

      if (isGameSolved) {
        storage.update({ isSolved: true, isRunning: false })
      }

      if (typeof currentValue === "object") {
        currentValue = currentValue.clone()
      }

      const history = new LiveObject<HistoryStack>({
        index,
        valueBefore: currentValue,
        valueAfter: numPad,
        mode: "default"
      })

      undoHistory.push(history)
    },
    []
  )

  const addNotes = useMutation(
    ({ storage }, { index, numPad }: { index: number; numPad: number }) => {
      if (index === null) return

      const sudoku = storage.get("sudoku")
      if (sudoku.get(index)?.get("immutable") === true) {
        return
      }

      const undoHistory = storage.get("undoHistory")

      const cell = sudoku.get(index)

      if (cell?.get("valid") === true) {
        cell.set("valid", false)
      }

      const value = cell?.get("value")
      if (value === undefined) return

      if (typeof value === "object" && value !== null) {
        const after = [...value?.toImmutable()]

        const currentValue = value?.get(numPad - 1)
        if (currentValue === undefined) return

        after[numPad - 1] = currentValue > 0 ? 0 : numPad
        const history = new LiveObject<HistoryStack>({
          index,
          valueBefore: value?.clone(),
          valueAfter: new LiveList(after),
          mode: "notes"
        })
        undoHistory.push(history)
        value.set(numPad - 1, currentValue > 0 ? 0 : numPad)
        return
      }

      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      arr[numPad - 1] = numPad
      cell?.set("value", new LiveList(arr))

      const history = new LiveObject<HistoryStack>({
        index,
        valueBefore: value,
        valueAfter: new LiveList(arr),
        mode: "notes"
      })

      undoHistory.push(history)
    },
    []
  )

  if (isSolved) {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors
      })

      requestAnimationFrame(frame)
    }
    frame()
  }

  return (
    <div className="grid grid-cols-3 gap-1 w-full xs:gap-2 sm:grid-cols-5 md:gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad, index) => (
        <Button
          disabled={!isRunning || isSolved}
          variant="secondary"
          key={index}
          className={cn(
            "aspect-square w-full rounded text-center", 
            "text-xs xs:text-sm sm:text-base md:text-lg",
            "p-1 xs:p-1.5 sm:p-2",
            "min-w-8 min-h-8 xs:min-w-10 xs:min-h-10 sm:min-w-12 sm:min-h-12 md:min-w-14 md:min-h-14"
          )}
          onClick={() => {
            if (notesMode) {
              addNotes({ numPad, index: tableCell.index! })
              return
            }
            selectNum({ numPad, index: tableCell.index })
          }}
        >
          <p
            className={cn("transition-all duration-200 ease-in-out", {
              "text-xs xs:text-xxs sm:text-xs md:text-xs": notesMode
            })}
          >
            {numPad}
          </p>
        </Button>
      ))}
     
    </div>
  )
}