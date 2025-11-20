from fastapi import FastAPI
from routes.routes import calender_router
from config.settings import settings
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calender_router, prefix="/api/calendar")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)