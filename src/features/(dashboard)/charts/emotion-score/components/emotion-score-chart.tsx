"use client"

import React from "react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { getColorByScore, getScoreMessage } from "@/lib/utils"
import { useEmotionScore } from "../api/get-emotion-score"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimeRange } from "@/types/api"

export function EmotionScoreChart() {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("today")

    const scoreQuery = useEmotionScore(timeRange)
    const scoreData = scoreQuery.data || []
    const score = scoreQuery.data ? scoreQuery.data[0].score : 0
    const totalTickets = scoreQuery.data ? scoreQuery.data[0].ticket_count : 0

    const chartColor = getColorByScore(score)
    const endAngle = (score / 100) * 360
    const scoreMessage = getScoreMessage(score)

    const chartConfig = React.useMemo(() => ({
        score: {
            label: "Satisfação",
            color: chartColor,
        },
    } satisfies ChartConfig), [chartColor])

    if (scoreQuery.isLoading) {
        return (
            <Card className="flex flex-col col-span-2 row-span-4">
                <CardHeader className="items-center pb-0">
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <Skeleton className="h-full w-full" />
                    </ChartContainer>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col col-span-2 row-span-4">
            <CardHeader className="flex items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Satisfação dos clientes</CardTitle>
                    <CardDescription>Análise de um total de {totalTickets} chamados</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={(val) => setTimeRange(val as TimeRange)}>
                    <SelectTrigger className="w-[160px] rounded-lg">
                        <SelectValue placeholder="Hoje" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="today" className="rounded-lg">
                            Hoje
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Últimos 7 dias
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Últimos 30 dias
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={scoreData}
                        endAngle={endAngle}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="score" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {score.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-lg mt-2"
                                                >
                                                    {scoreMessage.message}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium text-zinc-600 leading-none">
                    {scoreMessage.description}
                </div>
            </CardFooter>
        </Card>
    )
}
