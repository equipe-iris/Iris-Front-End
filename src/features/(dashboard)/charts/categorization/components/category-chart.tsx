"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { useTicketsCategories } from "../api/get-tickets-categorization";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
    tickets: {
        label: 'Chamados'
    },
    duvida: {
        label: 'Dúvida',
        color: 'var(--chart-1)'
    },
    reclamacao: {
        label: 'Reclamação',
        color: 'var(--chart-2)'
    },
    solicitacao: {
        label: 'Solicitação',
        color: 'var(--chart-3)'
    }
} satisfies ChartConfig

function CategoryChart() {

    const ticketsCategoriesQuery = useTicketsCategories()
    const ticketsCategories = ticketsCategoriesQuery.data

    const totalTickets = React.useMemo(() => {
        return ticketsCategories?.reduce((acc, curr) => acc + curr.quantity, 0) || 0
    }, [ticketsCategories])

    if (ticketsCategoriesQuery.isLoading) {
        return (
            <Card className="flex flex-col rounded-lg shadow-lg col-span-1 row-span-4">
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

    return (
        <Card className="flex flex-col rounded-lg shadow-lg col-span-1 row-span-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chamados por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
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
                            strokeWidth={5}
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
                            content={<ChartLegendContent nameKey="category"/>}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export { CategoryChart }