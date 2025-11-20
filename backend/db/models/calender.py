
from datetime import datetime, time
from sqlmodel import SQLModel, Field
from typing import Optional

class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type_id: int
    start_time: time
    end_time: time
    patient_name: str
    patient_email: str
    
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": datetime.now})