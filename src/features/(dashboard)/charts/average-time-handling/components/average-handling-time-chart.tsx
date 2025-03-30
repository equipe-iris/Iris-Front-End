"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    { date: "2024-04-01", aht: 186 },
    { date: "2024-04-02", aht: 138.5 },
    { date: "2024-04-03", aht: 143.5 },
    { date: "2024-04-04", aht: 251 },
    { date: "2024-04-05", aht: 331.5 },
    { date: "2024-04-06", aht: 320.5 },
    { date: "2024-04-07", aht: 212.5 },
    { date: "2024-04-08", aht: 364.5 },
    { date: "2024-04-09", aht: 84.5 },
    { date: "2024-04-10", aht: 225.5 },
    { date: "2024-04-11", aht: 338.5 },
    { date: "2024-04-12", aht: 251 },
    { date: "2024-04-13", aht: 361 },
    { date: "2024-04-14", aht: 178.5 },
    { date: "2024-04-15", aht: 145 },
    { date: "2024-04-16", aht: 164 },
    { date: "2024-04-17", aht: 403 },
    { date: "2024-04-18", aht: 387 },
    { date: "2024-04-19", aht: 211.5 },
    { date: "2024-04-20", aht: 119.5 },
    { date: "2024-04-21", aht: 168.5 },
    { date: "2024-04-22", aht: 197 },
    { date: "2024-04-23", aht: 184 },
    { date: "2024-04-24", aht: 338.5 },
    { date: "2024-04-25", aht: 232.5 },
    { date: "2024-04-26", aht: 102.5 },
    { date: "2024-04-27", aht: 401.5 },
    { date: "2024-04-28", aht: 151 },
    { date: "2024-04-29", aht: 277.5 },
    { date: "2024-04-30", aht: 417 },
    { date: "2024-05-01", aht: 192.5 },
    { date: "2024-05-02", aht: 301.5 },
    { date: "2024-05-03", aht: 218.5 },
    { date: "2024-05-04", aht: 402.5 },
    { date: "2024-05-05", aht: 435.5 },
    { date: "2024-05-06", aht: 509 },
    { date: "2024-05-07", aht: 344 },
    { date: "2024-05-08", aht: 179.5 },
    { date: "2024-05-09", aht: 203.5 },
    { date: "2024-05-10", aht: 311.5 },
    { date: "2024-05-11", aht: 302 },
    { date: "2024-05-12", aht: 218.5 },
    { date: "2024-05-13", aht: 178.5 },
    { date: "2024-05-14", aht: 469 },
    { date: "2024-05-15", aht: 426.5 },
    { date: "2024-05-16", aht: 369 },
]

const chartConfig = {
    aht: {
        label: "Minutos",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function AverageTimeHandlingChart() {

    return (
        <Card className="col-span-3 row-span-4">
            <CardHeader>
                <CardTitle>Tempo médio de atendimento</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("pt-BR", {
                                    month: "numeric",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("pt-BR", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="aht" fill={`var(--color-aht)`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
