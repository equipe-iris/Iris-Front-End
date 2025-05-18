import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, subDays } from "date-fns";

import { DateRange, TimeRange } from "@/types/api";

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
      break
    case "all":
      return {
        start_date: "",
        end_date: ""
      }
  }

  return {
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(today, "yyyy-MM-dd"),
  }
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytes")
      : (sizes[i] ?? "Bytes")
  }`
}

export function formatDateTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}