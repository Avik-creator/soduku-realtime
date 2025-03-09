import { OthersType } from "@/hooks/useOtherInfo"
import { Notes } from "./notes"
import { OtherPresence } from "./otherPresence"

type MutableCellProps = {
  value: number | readonly number[] | undefined
  sudokuIndex: number
  onClick: () => void
  className?: string
  others: OthersType
}
export const MutableCell: React.FC<MutableCellProps> = ({
  value,
  sudokuIndex,
  onClick,
  others,
  className
}) => {
  const showNotes = typeof value === "object"
  return (
    <div onClick={onClick} className={className}>
      {showNotes ? <Notes notes={value} /> : value !== 0 && <p>{value}</p>}
      <OtherPresence others={others} sudokuIndex={sudokuIndex} />
    </div>
  )
}