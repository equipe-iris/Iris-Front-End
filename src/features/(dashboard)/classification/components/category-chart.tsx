"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";

const categoryMockData = [
    { category: "duvida", value: 10, fill: "var(--color-duvida)" },
    { category: "reclamacao", value: 2, fill: "var(--color-reclamacao)" },
    { category: "suporte", value: 12, fill: "var(--color-suporte)" }
]

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
    suporte: {
        label: 'Suporte',
        color: 'var(--chart-3)'
    }
} satisfies ChartConfig

function CategoryChart() {

    const totalTickets = React.useMemo(() => {
        return categoryMockData.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    return (
        <Card className="min-h-[300px] flex flex-col rounded-lg shadow-lg col-span-1 row-span-4">
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
                            data={categoryMockData}
                            dataKey="value"
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