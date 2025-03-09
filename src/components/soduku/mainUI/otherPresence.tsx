import { OthersType } from "@/hooks/useOtherInfo"

export const OtherPresence: React.FC<{
  sudokuIndex: number
  others: OthersType
}> = ({ sudokuIndex, others }) => {
  return (
    <>
      {others.map(([connectionId, { focusIndex, color }]) => {
        if (focusIndex === sudokuIndex) {
          return (
            <div
              key={connectionId}
              style={{ outlineColor: color }}
              className="-outline-offset-[2px] absolute inset-0 z-10 flex outline-[3px]"
            />
          )
        }
      })}
    </>
  )
}