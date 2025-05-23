"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"

import { useAHT } from "../api/get-average-time-handling"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"


import { parseISO, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Settings } from "lucide-react"
import { useForm } from "react-hook-form"
import { updateATHGoalSchema, UpdateATHGoalSchema, useUpdateATHGoal } from "../api/update-ath-goal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAHTGoal } from "../api/get-ath-goal"

function formatMinutesToGraphTooltip(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    let result = "";
    if (hours > 0) result += `${hours}h`;
    result += `${mins.toString().padStart(2, "0")}m`;

    return result;
}

function formatMinutesToGraphAxis(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hours > 0) {
        return `${hours}h${mins.toString().padStart(2, "0")}m`;
    } else {
        return `${mins.toString().padStart(2, "0")}m`;
    }
}

const chartConfig = {
    average_time: {
        label: "Tempo médio",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function AverageTimeHandlingChart() {

    const [timeRange, setTimeRange] = React.useState<number>(12)

    const ahtQuery = useAHT(timeRange)
    const chartData = ahtQuery.data

    const ahtGoalQuery = useAHTGoal()
    const ahtGoal = ahtGoalQuery.data

    if (ahtQuery.isLoading || ahtQuery.isFetching) {
        return (
            <Card className="flex flex-col col-span-7 row-span-4">
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
        <Card className="col-span-7 row-span-4">
            <CardHeader className="flex items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Tempo médio de encerramento</CardTitle>
                    <CardDescription>Média do tempo levado para encerrar chamados de cada mês.</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="p-2 border rounded-lg cursor-pointer hover:bg-accent-foreground/5 transition-colors group">
                                <Settings className="size-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Atualizar meta de tempo</DialogTitle>
                                <DialogDescription>Configurar valor de referência para o tempo médio de encerramento esperado.</DialogDescription>
                            </DialogHeader>
                            <AHTGoalForm />
                        </DialogContent>
                    </Dialog>
                    <Select value={String(timeRange)} onValueChange={(val) => setTimeRange(Number(val))}>
                        <SelectTrigger className="w-[160px] rounded-lg">
                            <SelectValue placeholder="Últimos 12 Meses" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="1" className="rounded-lg">
                                Último mês
                            </SelectItem>
                            <SelectItem value="6" className="rounded-lg">
                                Últimos 6 meses
                            </SelectItem>
                            <SelectItem value="12" className="rounded-lg">
                                Últimos 12 meses
                            </SelectItem>
                            <SelectItem value="0" className="rounded-lg">
                                Todo o período
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="w-full max-h-[300px]"
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
                            tickFormatter={formatMinutesToGraphAxis}
                            tickSize={2}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = parseISO(value)
                                return format(date, "MM/yyyy", { locale: ptBR })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="average_time"
                                    labelFormatter={(value) => {
                                        const date = parseISO(value)
                                        return format(date, "MMMM 'de' yyyy", { locale: ptBR })
                                    }}
                                    formatter={(value) => `Tempo médio: ${formatMinutesToGraphTooltip(Number(value))}`}
                                />
                            }
                        />
                        <Bar dataKey="average_time" fill={`oklch(71.05% 0.127578 181.6019)`} />
                        {ahtGoal ? (
                            <ReferenceLine
                                y={ahtGoal}
                                stroke="red"
                                strokeDasharray="10 8"
                                label={{
                                    value: `Meta: Máximo de ${formatMinutesToGraphTooltip(ahtGoal)}`,
                                    position: "top",
                                    fill: "red",
                                    fontSize: 14,
                                    fontWeight: 500
                                }}
                            />
                        ) : null}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

function AHTGoalForm() {

    const form = useForm<UpdateATHGoalSchema>({
        defaultValues: {
            ath_hours: 0,
            ath_minutes: 0,
        },
        resolver: zodResolver(updateATHGoalSchema),
        mode: "onSubmit"
    })

    const updateATHGoalMutation = useUpdateATHGoal({
        mutationConfig: {
            onSuccess: () => {
                toast.success("Meta de tempo médio atualizada com sucesso!")
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(`Não foi possível atualizar a meta: ${error}`)
                console.log(error)
            }
        }
    })
    const isPending = updateATHGoalMutation.isPending

    function onSubmit(data: UpdateATHGoalSchema) {
        console.log(data)
        updateATHGoalMutation.mutate(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 py-4"
            >
                <div className="flex items-center gap-4">
                    <FormField
                        control={form.control}
                        name="ath_hours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horas</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ath_minutes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minutos</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} max={59} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormMessage />

                <Button
                    type="submit"
                    className="mt-4"
                >
                    {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Atualizar
                </Button>
            </form>
        </Form>
    )
}
