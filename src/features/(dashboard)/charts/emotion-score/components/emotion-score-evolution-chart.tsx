"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent, CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { date: "23/03", score: 89 },
    { date: "24/03", score: 80 },
    { date: "25/03", score: 81 },
    { date: "26/03", score: 65 },
    { date: "27/03", score: 67 },
    { date: "28/03", score: 43 }
]

const chartConfig = {
    score: {
        label: "Satisfação",
        color: "var(--chart-3)",
    }
} satisfies ChartConfig

export function EmotionScoreEvolutionChart() {
    return (
        <Card className="col-span-2 row-span-4">
            <CardHeader>
                <CardTitle>Evolução da satisfação dos clientes</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[260px]">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                        //tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="score"
                            type="natural"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-score)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
