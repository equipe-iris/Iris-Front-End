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
import { useDailyTickets } from "../api/get-daily-tickets"
import { Skeleton } from "@/components/ui/skeleton"

import { parseISO, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DailyTicketsDrawer } from "./daily-tickets-drawer"

const chartConfig = {
    quantity: {
        label: "Chamados",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function DailyTicketsChart() {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")
    const [selectedDate, setSelectedDate] = React.useState<string | undefined>(undefined)
    const [openDrawer, setOpenDrawer] = React.useState(false)

    const ticketsTrendQuery = useDailyTickets(timeRange)
    const ticketsTrendData = ticketsTrendQuery.data
    const isEmpty = !ticketsTrendData || ticketsTrendData.length === 0

    function handleDotClick(date: string) {
        setSelectedDate(date)
        setOpenDrawer(true)
    }


    if (ticketsTrendQuery.isLoading || ticketsTrendQuery.isFetching) {
        return (
            <Card className="flex flex-col col-span-10 row-span-4 lg:col-span-5 xl:col-span-7">
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
            <Card className="flex flex-col col-span-10 row-span-4 lg:col-span-5 xl:col-span-7">
                <CardHeader className="flex items-center justify-between pb-0">
                    <div className="grid gap-1">
                        <CardTitle>Trafego diário de chamados</CardTitle>
                        <CardDescription>Quantidade de chamados abertos diariamente num determinado período.</CardDescription>
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
            <Card className="col-span-10 row-span-4 lg:col-span-5 xl:col-span-7">
                <CardHeader className="flex items-center justify-between pb-0">
                    <div className="grid gap-1">
                        <CardTitle>Trafego diário de chamados</CardTitle>
                        <CardDescription>Quantidade de chamados abertos diariamente num determinado período.</CardDescription>
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
                            data={ticketsTrendData}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                            onClick={(val) => handleDotClick(val?.activeLabel as string)}
                            style={{ cursor: "pointer"}}
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
                            <Line
                                dataKey="quantity"
                                type="natural"
                                stroke="var(--chart-3)"
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

            <DailyTicketsDrawer open={openDrawer} onOpenChange={setOpenDrawer} start_date={selectedDate} />
        </>
    )
}
