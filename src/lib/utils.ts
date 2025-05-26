import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMinutes, format, parseISO, subDays } from "date-fns";

import { DateRange, TimeRange } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function getToday() {
  const today = new Date()
  return format(today, "yyyy-MM-dd")
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
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytes")
      : (sizes[i] ?? "Bytes")
    }`
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return "";

  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatTicketHandlingTime(startDate?: string | Date, endDate?: string | Date): string {
  if (!startDate || !endDate) return "-";

  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
  const minutes = differenceInMinutes(end, start);

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours > 0) {
    return `${hours}h${mins.toString().padStart(2, "0")}m`;
  } else {
    return `${mins.toString().padStart(2, "0")}m`;
  }
}

export function splitTicketMessages(content: string): string[] {
  if (!content) return [];
  return content
    .split("|")
    .map(msg => msg.trim())
    .filter(msg => msg.length > 0);
}