"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { useTicketsCategories } from "../api/get-tickets-categorization";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeRange } from "@/types/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryDrawer } from "./category-drawer";

const chartConfig = {
    tickets: {
        label: 'Chamados'
    },
    duvida: {
        label: 'Dúvida',
        color: 'var(--chart-5)'
    },
    reclamacao: {
        label: 'Reclamação',
        color: 'var(--chart-4)'
    },
    solicitacao: {
        label: 'Solicitação',
        color: 'var(--chart-1)'
    }
} satisfies ChartConfig

function CategoryChart() {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("all")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("")
    const [openDrawer, setOpenDrawer] = React.useState(false)

    const ticketsCategoriesQuery = useTicketsCategories(timeRange)
    const ticketsCategories = ticketsCategoriesQuery.data

    const totalTickets = React.useMemo(() => {
        return ticketsCategories?.reduce((acc, curr) => acc + curr.quantity, 0) || 0
    }, [ticketsCategories])

    const isEmpty = !ticketsCategories || ticketsCategories.length === 0

    function handleCategoryClick(category: string) {
        setSelectedCategory(category)
        setOpenDrawer(true)
    }

    if (ticketsCategoriesQuery.isLoading) {
        return (
            <Card className="flex flex-col rounded-lg shadow-lg col-span-3 row-span-4">
                <CardHeader className="items-center pb-0">
                    <Skeleton className="h-8 w-1/3" />
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

    if (isEmpty) {
        return (
            <Card className="flex flex-col rounded-lg shadow-lg col-span-3 row-span-4">
                <CardHeader className="flex flex-col gap-3">
                    <CardTitle>Categorização dos chamados</CardTitle>
                    <Select value={timeRange} onValueChange={(val) => setTimeRange(val as TimeRange)}>
                        <SelectTrigger className="w-[160px] rounded-lg">
                            <SelectValue placeholder="Todo o período" />
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
        );
    }

    return (
        <>
            <Card className="flex flex-col rounded-lg shadow-lg col-span-3 row-span-4">
                <CardHeader className="flex flex-col gap-3">
                    <CardTitle>Categorização dos chamados</CardTitle>
                    <Select value={timeRange} onValueChange={(val) => setTimeRange(val as TimeRange)}>
                        <SelectTrigger className="w-[160px] rounded-lg">
                            <SelectValue placeholder="Todo o período" />
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
                            <SelectItem value="all" className="rounded-lg">
                                Todo o período
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[300px] w-full max-w-[350px]"

                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={ticketsCategories}
                                dataKey="quantity"
                                nameKey="category"
                                innerRadius={60}
                                label={({ value }) => {
                                    const percent = totalTickets > 0 ? (value / totalTickets) * 100 : 0;
                                    return `${percent.toFixed(1)}%`;
                                }}
                                style={{ cursor: "pointer" }}
                                onClick={(val) => handleCategoryClick(val?.category as string)}
                            >
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
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalTickets.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Chamados
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent nameKey="category" />}
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <CategoryDrawer open={openDrawer} onOpenChange={setOpenDrawer} category={selectedCategory} timeRange={timeRange} />
        </>
    )
}

export { CategoryChart }