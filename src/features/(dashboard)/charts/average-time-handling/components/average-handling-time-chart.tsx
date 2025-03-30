"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { useAHT } from "../api/get-average-time-handling"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
    average_time: {
        label: "Minutos",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function AverageTimeHandlingChart() {

    const ahtQuery = useAHT()
    const chartData = ahtQuery.data

    if (ahtQuery.isLoading || ahtQuery.isFetching) {
        return (
            <Card className="flex flex-col col-span-4 row-span-4">
                <CardHeader className="items-center pb-0">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/2" />
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
        <Card className="col-span-4 row-span-4">
            <CardHeader className="flex items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Tempo médio de atendimento</CardTitle>
                    <CardDescription>Média em minutos do tempo levado para encerrar um chamado</CardDescription>
                </div>
                <Select>
                    <SelectTrigger className="w-[160px] rounded-lg">
                        <SelectValue placeholder="Últimos 7 dias" />
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
                    </SelectContent>
                </Select>
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
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            label={{
                                value: "Minutos",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />
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
                        <Bar dataKey="average_time" fill={`oklch(64.35% 0.2452 16.5)`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
