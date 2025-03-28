import { CategoryChartData } from "@/types/types";

function formatToCategoryChart(data: CategoryChartData[]): CategoryChartData[] {
    if (!data) return [];

    return data
        .map(item => ({
            category: item.category,
            value: item.value,
            fill: `var(--color-${item.category}`
        }));

}

export { formatToCategoryChart };