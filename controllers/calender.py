from sqlmodel import Session
from services.calender_service import calender_service
from validations.booking import BookingCreate

class CalenderController:
    def __init__(self, ):
        self.calender_service = calender_service
    
    def get_all_event_types(self):
        return self.calender_service.get_all_event_types()
    
    def get_available_slots(self, event_type_id: int):
        return self.calender_service.get_available_slots_by_type(event_type_id)
    
    def book_event(self, session: Session, event_data: BookingCreate):
        return self.calender_service.create_booking(session, event_data)
    
    def get_booking(self, session: Session, booking_id: int):
        return self.calender_service.get_booking(session, booking_id)