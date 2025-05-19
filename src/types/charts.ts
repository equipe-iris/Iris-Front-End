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

export interface AHTChartData {
    date: string
    average_time: number
}

export interface TicketCardsData {
    total_tickets: number
    tickets_today: number
}

export interface FrequentTermsData {
    term: string
    count: number
}