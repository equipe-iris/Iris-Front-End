export interface DateRange {
    start_date: string
    end_date: string
}

export type TimeRange = "today" | "7d" | "30d" | "90d" | "all"