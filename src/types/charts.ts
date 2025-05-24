export interface CategoryChartData {
    category: string
    quantity: number
    fill?: string
}

export interface EmotionsChartData {
    emotion: string
    quantity: number
    fill?: string
}

export interface EmotionEvolutionData {
    date: string
    positivo: number
    neutro: number
    negativo: number
}

export interface DailyTicketsData {
    date: string
    quantity: number
}

export interface AHTChartData {
    date: string
    average_time: number
}

export interface TicketCardsData {
    total: number
    open: number
    closed: number
}

export interface FrequentTermsData {
    term: string
    count: number
}