import json
from pathlib import Path
from sqlmodel import Session, select
from typing import Optional
from validations.booking import BookingCreate
from db.models.calender import Booking
from datetime import time

SLOT_TYPES_PATH = Path(__file__).parent.parent / "data" / "slot_types.json"
SLOTS_PATH = Path(__file__).parent.parent / "data" / "slots.json"


class CalenderService:
    def get_all_event_types(self):
        with open(SLOT_TYPES_PATH, "r") as f:
            return json.load(f)

    def get_event_type_by_id(self, type_id: int):
        types = self.get_all_event_types()
        for t in types:
            if t["id"] == type_id:
                return t
        return None

    def get_all_slots(self):
        with open(SLOTS_PATH, "r") as f:
            return json.load(f)

    def get_slots_by_type(self, type_id: int):
        return [slot for slot in self.get_all_slots() if slot["type_id"] == type_id]

    def get_available_slots_by_type(self, type_id: int):
        return [slot for slot in self.get_all_slots() if slot["type_id"] == type_id and slot["available"]]

    def create_booking(self, session: Session, booking_data: BookingCreate) -> Booking:
        # Convert string times to time objects if needed
        if isinstance(booking_data.start_time, str):
            start_time = time.fromisoformat(booking_data.start_time)
        else:
            start_time = booking_data.start_time

        if isinstance(booking_data.end_time, str):
            end_time = time.fromisoformat(booking_data.end_time)
        else:
            end_time = booking_data.end_time

        booking = Booking(
            type_id=booking_data.type_id,
            start_time=start_time,
            end_time=end_time,
            patient_name=booking_data.patient_name,
            patient_email=booking_data.patient_email
        )
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking

    def get_booking(self, session: Session, booking_id: int) -> Optional[dict]:
        booking = session.get(Booking, booking_id)
        if not booking:
            return None
        type_details = self.get_event_type_by_id(booking.type_id)

        return {
            "id": booking.id,
            "type_id": booking.type_id,
            "type": type_details,
            "start_time": booking.start_time,
            "end_time": booking.end_time,
            "patient_name": booking.patient_name,
            "patient_email": booking.patient_email,
            "created_at": booking.created_at,
            "updated_at": booking.updated_at
        }

calender_service = CalenderService()
