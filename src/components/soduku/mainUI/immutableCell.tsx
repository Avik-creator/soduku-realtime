import { OthersType } from "@/hooks/useOtherInfo"
import { OtherPresence } from "./otherPresence"

type ImmutableCellProps = {
  value: number | readonly number[] | undefined
  sudokuIndex: number
  className: string
  onClick: () => void
  others: OthersType
}
export const ImmutableCell: React.FC<ImmutableCellProps> = ({
  value,
  sudokuIndex,
  onClick,
  others,
  className
}) => {
  return (
    <div onClick={onClick} className={className}>
      <p>{value}</p>
      <OtherPresence others={others} sudokuIndex={sudokuIndex} />
    </div>
  )
}