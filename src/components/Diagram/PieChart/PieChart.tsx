import { DatumId, ResponsivePie } from "@nivo/pie"

import { PieChartData } from "../../../types"

interface PieChartProps {
  data: PieChartData
  containerClassName?: string
  shortInfoLines?: boolean
}

const PieChart = ({
  data,
  containerClassName,
  shortInfoLines = false,
}: PieChartProps) => {
  const signDataInfo = (value: number, id: DatumId): string => {
    if (!shortInfoLines) {
      return `${value}% ${id}`
    } else {
      return `${id} ${value}%`
    }
  }

  return (
    <div className={containerClassName}>
      <ResponsivePie
        data={data}
        startAngle={data[0].value >= 20 && data[0].value <= 80 ? 0 : 90}
        endAngle={data[0].value >= 20 && data[0].value <= 80 ? 360 : 450}
        colors={["#FF6B01", "#D7D7D7"]}
        // arcLinkLabel={e => e.value + "% " + e.id}
        arcLinkLabel={e => signDataInfo(e.value, e.id)}
        arcLinkLabelsTextOffset={5}
        arcLinkLabelsSkipAngle={1}
        arcLinkLabelsTextColor='#000000'
        arcLinkLabelsOffset={shortInfoLines ? -50 : -30}
        arcLinkLabelsDiagonalLength={shortInfoLines ? 20 : 50}
        arcLinkLabelsStraightLength={shortInfoLines ? 14 : 32}
        arcLinkLabelsColor='black'
        enableArcLabels={false}
        isInteractive={false}
        // animate={false}
      />
    </div>
  )
}

export default PieChart
