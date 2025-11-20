import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateStr: string) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getEndPoints = (type: string) => {
  switch (type) {
    case "event-types":
      return "/api/calendar/event_type";
    case "availability":
      return "/api/calendar/available_slots/";
    case "bookings":
      return "/api/calendar/list_all_bookings";
    case "create-booking":
      return "/api/calendar/book";
  }
}