import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, isToday, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDueDateStatus(dueDate: string) {
  const due = parseISO(dueDate)
  const today = new Date()
  const diff = differenceInDays(due, today)

  if (diff < 0) {
    return { label: `${Math.abs(diff)}d Overdue`, color: "red" }
  }
  if (isToday(due)) {
    return { label: "Due Today", color: "orange" }
  }
  if (diff <= 7) {
    return { label: `Due in ${diff}d`, color: "yellow" }
  }
  return { label: `Due in ${diff}d`, color: "green" }
}
