import { ArrowRight, Calendar, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatDateTime } from "@/lib/utils";

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <Card className="group relative overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 rounded-xl">
      <div className="flex justify-between items-start mb-4 px-4 flex-col">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
            {booking.type?.type || "General Consultation"}
          </h3>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md ring-1 ring-blue-600/10">
            <Clock className="w-3 h-3" />
            {booking.type?.duration} min
          </span>
        </div>

        <CardContent className="p-0 flex justify-between flex-col">
          {/* Patient Info */}
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 border border-slate-100 my-5">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {booking.patient_name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {booking.patient_name}
              </p>
              <div className="flex items-center text-xs text-slate-500 mt-0.5 truncate">
                <Mail className="w-3 h-3 mr-1" />
                {booking.patient_email}
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="flex gap-2 items-center">
              {booking.start_time}{" "}
              <ArrowRight className="w-3 h-3 text-slate-400" />
              {booking.end_time}
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="px-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Booked on {formatDateTime(booking.created_at)}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
