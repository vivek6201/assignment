import { createBooking, getBookings } from "@/lib/bookingApi";
import type { BookingCreate } from "@/validations/booking";
import { useState } from "react";

export const useBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await getBookings();
    setBookings(response);
  };

  const refreshBookings = () => {
    fetchBookings();
  };

  const createClientBooking = async (bookingData: BookingCreate) => {
    try {
      const response = await createBooking(bookingData);
      if (response) refreshBookings();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return { bookings, fetchBookings, refreshBookings, createClientBooking };
};
