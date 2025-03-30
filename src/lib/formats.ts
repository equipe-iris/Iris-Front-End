import { CategoryChartData } from "@/types/types";

function formatToCategoryChart(data: CategoryChartData[] | undefined): CategoryChartData[] {
    if (!data || data == undefined) return [];

    return data
        .map(item => ({
            category: item.category,
            quantity: item.quantity,
            fill: `var(--color-${item.category})`
        }));

}

export { formatToCategoryChart };