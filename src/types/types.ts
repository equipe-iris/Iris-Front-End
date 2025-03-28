export interface CategoryChartData {
    category: string
    value: number
    fill?: string
}

export interface EmotionScoreChartData {
    date?: string
    score: number
    tickets?: number
}

export interface AHTChartData {
    date?: string
    aht: number
}