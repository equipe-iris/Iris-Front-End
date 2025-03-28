import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorByScore(score: number): string {
  if (score > 60) return "#22c55e";
  if (score >= 40 && score <= 60) return "#eab308"; // Amarelo
  return "#ef4444"; 
};

export function getScoreMessage(score: number): { message:string, description:string } {
  if (score > 60) return { message: "Positivo", description: "Continue assim!" };
  if (score >= 40 && score <= 60) return { message: "Neutro", description: "Há espaço para melhorias." };
  return { message: "Negativo", description: "Analise os resultados para buscar melhorias." };
} 