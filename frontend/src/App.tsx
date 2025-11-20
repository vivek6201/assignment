import { useEffect, useState } from "react";
import Header from "./components/elements/header";
import { useBooking } from "./hooks/useBooking";
import { CalendarDays } from "lucide-react";
import BookingSkeletonGrid from "./components/elements/booking-skeleton";
import BookingCard from "./components/elements/booking-card";

export default function App() {
  const { bookings, fetchBookings, createClientBooking } = useBooking();
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    await fetchBookings();
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header createClientBooking={createClientBooking} />

      <main className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your patient appointments and schedules.
            </p>
          </div>
          <div className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border shadow-sm">
            Total Bookings: {bookings?.length || 0}
          </div>
        </div>

        {loading ? (
          <BookingSkeletonGrid />
        ) : bookings && bookings.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {bookings.map((booking: any) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <CalendarDays className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-900">No bookings found</h3>
      <p className="text-slate-500 max-w-sm mt-2 text-sm">
        You don't have any upcoming appointments scheduled. Create a new client
        booking to get started.
      </p>
    </div>
  );
}
