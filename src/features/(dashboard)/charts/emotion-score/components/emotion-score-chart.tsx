"use client"

import { useMemo } from "react"
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
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { getColorByScore, getScoreMessage } from "@/lib/utils"
import { useEmotionScore } from "../api/get-emotion-score"
import { Skeleton } from "@/components/ui/skeleton"

export function EmotionScoreChart() {

    const scoreQuery = useEmotionScore()
    const scoreData = scoreQuery.data || []
    const score = scoreQuery.data ? scoreQuery.data[0].score : 0

    const chartColor = getColorByScore(score)
    const endAngle = (score / 100) * 360
    const scoreMessage = getScoreMessage(score)

    const chartConfig = useMemo(() => ({
        score: {
            label: "Satisfação",
            color: chartColor,
        },
    } satisfies ChartConfig), [chartColor])

    if (scoreQuery.isLoading) {
        return (
            <Card className="flex flex-col col-span-1 row-span-4">
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
        <Card className="flex flex-col col-span-1 row-span-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>Satisfação dos clientes</CardTitle>
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
