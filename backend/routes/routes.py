from fastapi import APIRouter
from controllers.calender import CalenderController
from sqlmodel import Session
from fastapi import Depends
from db.config import get_session
from validations.booking import BookingCreate

calender_router = APIRouter()
calender_controller = CalenderController()

@calender_router.get("/event_type")
def get_all_event_types():
    return calender_controller.get_all_event_types()

@calender_router.get("/available_slots/{event_type_id}")
def get_available_slots(event_type_id: int):
    return calender_controller.get_available_slots(event_type_id)

@calender_router.post("/book")
def book_event(event_data: BookingCreate, session: Session = Depends(get_session)):
    return calender_controller.book_event(session, event_data)

@calender_router.get("/booking/{booking_id}")
def get_booking(booking_id: int, session: Session = Depends(get_session)):
    return calender_controller.get_booking(session, booking_id)

@calender_router.get("/list_all_bookings")
def list_all_bookings(session: Session = Depends(get_session)):
    return calender_controller.list_all_bookings(session)