from pydantic import BaseModel, EmailStr, Field
from datetime import time

class BookingCreate(BaseModel):
    type_id: int
    start_time: str
    end_time: str
    patient_name: str
    patient_email: EmailStr