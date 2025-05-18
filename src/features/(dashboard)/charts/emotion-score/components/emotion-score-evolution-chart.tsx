"use client"

import React from "react"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent, CardDescription, CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimeRange } from "@/types/api"
import { useEmotionScoreEvolution } from "../api/get-emotion-score-evolution"
import { Skeleton } from "@/components/ui/skeleton"

import { parseISO, format } from "date-fns"
import { ptBR } from "date-fns/locale"

const chartConfig = {
    score: {
        label: "Satisfação",
        color: "var(--chart-3)",
    }
} satisfies ChartConfig

export function EmotionScoreEvolutionChart() {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")

    const emotionScoreTrendQuery = useEmotionScoreEvolution(timeRange)
    const chartData = emotionScoreTrendQuery.data

    if (emotionScoreTrendQuery.isLoading || emotionScoreTrendQuery.isFetching) {
        return (
            <Card className="flex flex-col col-span-3 row-span-4">
                <CardHeader className="items-center pb-0">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[300px]"
                    >
                        <Skeleton className="h-full w-full" />
                    </ChartContainer>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-3 row-span-4">
            <CardHeader className="flex items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Tendência de Satisfação do Cliente</CardTitle>
                    <CardDescription>Evolução do score de satisfação dos clientes ao longo do tempo</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={(val) => setTimeRange(val as TimeRange)}>
                    <SelectTrigger className="w-[160px] rounded-lg">
                        <SelectValue placeholder="Últimos 90 dias" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="7d" className="rounded-lg">
                            Últimos 7 dias
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Últimos 30 dias
                        </SelectItem>
                        <SelectItem value="90d" className="rounded-lg">
                            Últimos 90 dias
                        </SelectItem>
                        <SelectItem value="all" className="rounded-lg">
                            Todo o período
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[300px]">
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
                        <YAxis
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            label={{
                                value: "Satisfação",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("pt-BR", {
                                    month: "numeric",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelFormatter={(value) => {
                                        const date = parseISO(value)
                                        return format(date, "dd 'de' MMM 'de' yyyy", { locale: ptBR })
                                    }}
                                />
                            }

                        />
                        <Line
                            dataKey="score"
                            type="natural"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
