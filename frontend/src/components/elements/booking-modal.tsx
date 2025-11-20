import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAvailableSlots, getEventType } from "@/lib/bookingApi";
import { useEffect, useState } from "react";
import { bookingSchema, type BookingCreate } from "@/validations/booking";

export function BookingModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: BookingCreate) => void;
}) {
  const [types, setTypes] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

  async function fetchEventTypes() {
    try {
      const data = await getEventType();
      setTypes(data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  }

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const form = useForm<BookingCreate>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      type_id: -1,
      selected_slot: {
        start_time: "",
        end_time: "",
      },
      patient_name: "",
      patient_email: "",
    },
  });

  const watchedTypeId = form.watch("type_id");

  async function fetchSlotTime(typeId: number) {
    const data = await getAvailableSlots(typeId);
    setSlots(data.filter((slot: { available: boolean }) => slot.available));
  }

  useEffect(() => {
    if (watchedTypeId && watchedTypeId !== -1) {
      fetchSlotTime(watchedTypeId);
    } else {
      setSlots([]);
    }
  }, [watchedTypeId]);

  function handleSubmit(data: BookingCreate) {
    if (onSubmit) onSubmit(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Booking</DialogTitle>
          <DialogDescription>fetchSlotTime(watchedTypeId);</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((type: any) => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selected_slot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Slots</FormLabel>
                  <FormControl>
                    <Select
                      value={`${field.value.start_time}-${field.value.end_time}`}
                      onValueChange={(val) => {
                        const slot = slots.find(
                          (s: { start_time: string; end_time: string }) =>
                            `${s.start_time}-${s.end_time}` === val
                        );
                        if (slot) {
                          field.onChange({ start_time: slot.start_time, end_time: slot.end_time });
                        }
                      }}
                      disabled={slots.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            slots.length === 0
                              ? "No slots available"
                              : "Select a slot"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {slots.map(
                          (slot: { start_time: string; end_time: string }) => (
                            <SelectItem
                              key={`${slot.start_time}-${slot.end_time}`}
                              value={`${slot.start_time}-${slot.end_time}`}
                            >
                              {slot.start_time} - {slot.end_time}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Booking</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
