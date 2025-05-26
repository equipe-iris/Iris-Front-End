import { CategoryChartData, EmotionsChartData } from "@/types/charts";

function formatToCategoryChart(data: CategoryChartData[] | undefined): CategoryChartData[] {
    if (!data || data == undefined) return [];

    return data
        .map(item => ({
            category: item.category,
            quantity: item.quantity,
            fill: `var(--color-${item.category})`
        }));

}

function formatToEmotionsChart(data: EmotionsChartData[] | undefined): EmotionsChartData[] {
    if (!data || data == undefined) return [];

    return data
        .map(item => ({
            emotion: item.emotion,
            quantity: item.quantity,
            fill: `var(--color-${item.emotion})`
        }));

}

export { formatToCategoryChart, formatToEmotionsChart };