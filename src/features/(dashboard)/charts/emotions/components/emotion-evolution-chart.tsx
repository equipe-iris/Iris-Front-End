"use client"

import React from "react"

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
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
import { useEmotionEvolution } from "../api/get-emotion-evolution"
import { Skeleton } from "@/components/ui/skeleton"

import { parseISO, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { EmotionEvolutionDrawer } from "./emotion-evolution-drawer"

const chartConfig = {
    positivo: {
        label: "Positivo",
        color: "var(--positive)",
    },
    neutro: {
        label: "Neutro",
        color: "var(--neutral)",
    },
    negativo: {
        label: "Negativo",
        color: "var(--negative)",
    },
} satisfies ChartConfig

type EmotionKey = "positivo" | "neutro" | "negativo";

export function EmotionEvolutionChart() {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")
    const [selectedDate, setSelectedDate] = React.useState<string | undefined>(undefined)
    const [openDrawer, setOpenDrawer] = React.useState(false)


    const emotionTrendQuery = useEmotionEvolution(timeRange)
    const emotionTrendData = emotionTrendQuery.data
    const isEmpty = !emotionTrendData || emotionTrendData.length === 0


    const [opacity, setOpacity] = React.useState<Record<EmotionKey, number>>({
        positivo: 1,
        neutro: 1,
        negativo: 1,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMouseEnter(o: any) {
        const dataKey = o?.dataKey;
        if (dataKey === "positivo" || dataKey === "neutro" || dataKey === "negativo") {
            setOpacity((op) => {
                const newOpacity = { ...op };
                (Object.keys(newOpacity) as EmotionKey[]).forEach((key) => {
                    newOpacity[key] = key === dataKey ? 1 : 0.3;
                });
                return newOpacity;
            });
        }
    }

    function handleMouseLeave() {
        setOpacity({
            positivo: 1,
            neutro: 1,
            negativo: 1,
        });
    };

    function handleDotClick(date: string) {
        setSelectedDate(date)
        setOpenDrawer(true)
    }

    if (emotionTrendQuery.isLoading || emotionTrendQuery.isFetching) {
        return (
            <Card className="flex flex-col col-span-7 row-span-4">
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

    if (isEmpty) {
        return (
            <Card className="flex flex-col col-span-7 row-span-4">
                <CardHeader className="flex items-center justify-between pb-0">
                    <div className="grid gap-1">
                        <CardTitle>Tendência de emoções nos chamados</CardTitle>
                        <CardDescription>Evolução da distribuição das emoções dos clientes ao longo do tempo.</CardDescription>
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
                <CardContent className="flex-1 flex items-center justify-center">
                    <span className="text-muted-foreground text-center">
                        Nenhum dado encontrado para o filtro selecionado.
                    </span>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Card className="col-span-7 row-span-4">
                <CardHeader className="flex items-center justify-between pb-0">
                    <div className="grid gap-1">
                        <CardTitle>Tendência de emoções nos chamados</CardTitle>
                        <CardDescription>Evolução da distribuição das emoções dos clientes ao longo do tempo.</CardDescription>
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
                    <ChartContainer config={chartConfig} className="w-full max-h-[350px]">
                        <LineChart
                            accessibilityLayer
                            data={emotionTrendData}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                            onClick={(val) => handleDotClick(val?.activeLabel as string)}
                            style={{ cursor: "pointer" }}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                label={{
                                    value: "Quantidade",
                                    angle: -90,
                                    position: "left",
                                    style: { textAnchor: "middle" },
                                }}
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => {
                                    const date = parseISO(value)
                                    return format(date, "dd/MM", { locale: ptBR })
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
                            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                            <Line
                                dataKey="positivo"
                                type="natural"
                                stroke="var(--positive)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                }}
                                opacity={opacity.positivo}
                            />
                            <Line
                                dataKey="neutro"
                                type="natural"
                                stroke="var(--neutral)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                }}
                                opacity={opacity.neutro}
                            />
                            <Line
                                dataKey="negativo"
                                type="natural"
                                stroke="var(--negative)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                }}
                                opacity={opacity.negativo}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <EmotionEvolutionDrawer open={openDrawer} onOpenChange={setOpenDrawer} start_date={selectedDate} />
        </>
    )
}
