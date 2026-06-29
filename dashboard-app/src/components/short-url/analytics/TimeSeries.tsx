// import { use } from 'react'
// import { ShortUrlAnalyticsContext } from '@contexts/ShortUrlAnalytics'
// import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from '@components/ui/chart'

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//     color: "var(--primary)",
//   },
// } satisfies ChartConfig

function TimeSeries() {
  // const {
  //   range,
  //   isLoadingTimeline,
  //   timeline,
  // } = use(ShortUrlAnalyticsContext)

  // if (isLoadingTimeline) return "Loading..."
  // console.log(timeline)

  // const chartData = timeline.map((time) => ({
  //   time: time,
  // }))

  return (
    <></>
    // <ChartContainer
    //   config={chartConfig}
    //   className="w-[50vw]">
    //   <LineChart
    //     accessibilityLayer
    //     data={chartData}
    //     margin={{
    //       top: 20,
    //       left: 12,
    //       right: 12,
    //     }}>
    //     <CartesianGrid vertical={false} />
    //     <XAxis
    //       dataKey="time"
    //       tickLine={false}
    //       axisLine={false}
    //       tickMargin={8}
    //       tickFormatter={(value) => value.slice(0, 3)} />
    //     <ChartTooltip
    //       cursor={false}
    //       content={<ChartTooltipContent indicator="line" />} />
    //     <Line
    //       dataKey="visitors"
    //       type="natural"
    //       stroke="var(--color-visitors)"
    //       strokeWidth={2}
    //       dot={{
    //         fill: "var(--color-visitors)",
    //       }}
    //       activeDot={{
    //         r: 6,
    //       }}>
    //       <LabelList
    //         position="top"
    //         offset={12}
    //         className="fill-foreground"
    //         fontSize={12} />
    //     </Line>
    //   </LineChart>
    // </ChartContainer>
  )
}

export default TimeSeries
