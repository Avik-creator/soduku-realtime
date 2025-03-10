import { useOthersInfo } from "@/hooks/useOtherInfo"
import { cn } from "@/lib/utils"
import { useStorage } from "@liveblocks/react/suspense"
import { ImmutableCell } from "./immutableCell"
import { MutableCell } from "./mutableCell"


type tableCellProps = {
    value: number | null | readonly number[]
    index: number | null
}

interface SodukuCellProps extends React.ComponentPropsWithoutRef<'td'> {
    sodukuIndex: number
    tableCell: tableCellProps
    setTableCell: ({ value, index }: tableCellProps) => void
}


export const SodukuCell: React.FC<SodukuCellProps> = ({
    sodukuIndex, tableCell, setTableCell
}) => {
    const others = useOthersInfo()
    const soduku = useStorage((root)=> root.sudoku);
    const validateMode = useStorage((root) => root.validateMode)


    const { value, immutable, valid } = soduku[sodukuIndex]
  const sameValue = value === tableCell.value
  const notZero = tableCell.value !== 0
  const currentSelectedCell = tableCell.index === sodukuIndex
  const otherCellWithSameValue = sameValue && notZero && !currentSelectedCell


  const handleClick = () => {
    if(tableCell.index !== null && tableCell.index === sodukuIndex){
        setTableCell({ value: null, index: null })
        return;
    }
    setTableCell({ value: value ?? null, index: sodukuIndex })
  }

  const sharedClassName = "relative aspect-square size-full flex items-center justify-center text-xl"


 if (immutable) {
    const immutableStyles = cn(
      sharedClassName,
      "bg-primary/[0.04] dark:bg-primary-foreground/50",
      {
        "bg-primary/[0.12]": otherCellWithSameValue || currentSelectedCell
      }
    )
    return (
      <ImmutableCell
        onClick={handleClick}
        others={others}
        value={value}
        sudokuIndex={sodukuIndex}
        className={immutableStyles}
      />
    )
  }


   const cellClassName = cn(sharedClassName, {
    "text-correct": valid && validateMode,
    "text-incorrect": !valid && validateMode,
    "bg-primary/15": otherCellWithSameValue,
    "bg-correct/25": currentSelectedCell
  })

  return (
    <MutableCell
      onClick={handleClick}
      value={value}
      sudokuIndex={sodukuIndex}
      others={others}
      className={cellClassName}
    />
  )
}

