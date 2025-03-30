export interface CategoryChartData {
    category: string
    quantity: number
    fill?: string
}

export interface EmotionScoreChartData {
    date?: string
    score: number
    ticket_count?: number
    fill?: string
}

export interface AHTChartData {
    date?: string
    aht: number
}

export interface TicketCardsData {
    total_tickets: number
    tickets_today: number
}

export interface FrequentTermsData {
    term: string
    count: number
}