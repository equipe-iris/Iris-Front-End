export interface DateRange {
    start_date: string
    end_date: string
}

export interface Ticket {
    original_id: string;
    title: string;
    service_rating: string;
    sentiment_rating: string;
    start_date: string;
    end_date?: string;
}

export type TimeRange = "today" | "7d" | "30d" | "90d" | "all"