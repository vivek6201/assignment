import { useState } from "react";
import { BookingModal } from "./booking-modal";
import { Button } from "../ui/button";
import type { BookingCreate } from "@/validations/booking";

export default function Header({
  createClientBooking,
}: {
  createClientBooking: (data: BookingCreate) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleBooking = (data: BookingCreate) => {
    createClientBooking(data);
  };

  return (
    <header className="w-full px-6 py-4 border-b bg-background ">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <span className="font-bold text-xl text-primary">Calendly</span>
        </div>
        <Button onClick={() => setOpen(true)}>Create Booking</Button>
        {open && (
          <BookingModal
            open={open}
            onOpenChange={setOpen}
            onSubmit={handleBooking}
          />
        )}
      </div>
    </header>
  );
}
