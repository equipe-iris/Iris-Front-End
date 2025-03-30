import { CategoryChartData, EmotionScoreChartData } from "@/types/charts";

function formatToCategoryChart(data: CategoryChartData[] | undefined): CategoryChartData[] {
    if (!data || data == undefined) return [];

    return data
        .map(item => ({
            category: item.category,
            quantity: item.quantity,
            fill: `var(--color-${item.category})`
        }));

}

function formatToEmotionScoreChart(data: EmotionScoreChartData): EmotionScoreChartData[] {
    return [{
        date: data.date,
        score: data.score,
        ticket_count: data.ticket_count,
        fill: `var(--color-score)`
    }];
}

export { formatToCategoryChart, formatToEmotionScoreChart };