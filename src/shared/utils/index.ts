import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export { formatCurrency } from './formatCurrency'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
