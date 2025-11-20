import z from "zod";

export const bookingSchema = z.object({
  type_id: z.number().int().min(1, "Type ID is required"),
  selected_slot: z.object({
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
  }),
  patient_name: z.string().min(1, "Patient name is required"),
  patient_email: z.email("Invalid email address"),
});

export type BookingCreate = z.infer<typeof bookingSchema>;
