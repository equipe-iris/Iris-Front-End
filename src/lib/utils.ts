import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateRange, TimeRange } from "@/types/api";
import { format, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorByScore(score: number): string {
  if (score > 60) return "#22c55e";
  if (score >= 40 && score <= 60) return "#eab308"; // Amarelo
  return "#ef4444";
};

export function getScoreMessage(score: number): { message: string, description: string } {
  if (score > 60) return { message: "Positivo", description: "Continue assim!" };
  if (score >= 40 && score <= 60) return { message: "Neutro", description: "Há espaço para melhorias." };
  return { message: "Negativo", description: "Analise os resultados para buscar melhorias." };
}

export function getDateRange(timeRange: TimeRange): DateRange {
  const today = new Date()
  let startDate = new Date()

  switch (timeRange) {
    case "today":
      break
    case "7d":
      startDate = subDays(today, 7)
      break
    case "30d":
      startDate = subDays(today, 30)
      break
    case "90d":
      startDate = subDays(today, 90)
  }

  return {
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(today, "yyyy-MM-dd"),
  }
}