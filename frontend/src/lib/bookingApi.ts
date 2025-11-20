import type { BookingCreate } from "@/validations/booking";
import { apiClient } from "./apiConfig";
import { getEndPoints } from "./utils";

export const getEventType = async () => {
  const endpoint = getEndPoints("event-types")!;
  const res = await apiClient(endpoint, "GET", {}, null);

  return res.data;
};

export const getAvailableSlots = async (typeId: number) => {
  const endpoint = getEndPoints("availability")!;
  const res = await apiClient(`${endpoint}${typeId}`, "GET", {}, null);

  return res.data;
};

export const createBooking = async (bookingData: BookingCreate) => {
    const endpoint = getEndPoints("create-booking")!;
    const data = {
        type_id: bookingData.type_id,
        start_time: bookingData.selected_slot.start_time,
        end_time: bookingData.selected_slot.end_time,
        patient_name: bookingData.patient_name,
        patient_email: bookingData.patient_email,
    }
    const res = await apiClient(endpoint, "POST", {}, data);

    return res.data;
}

export const getBookings = async () => {
  const endpoint = getEndPoints("bookings")!;
  const res = await apiClient(endpoint, "GET", {}, null);

  return res.data;
};