# Backend Calendar Booking API

## Tech Stack
- Python 3.12
- FastAPI
- SQLModel
- PostgreSQL
- Alembic (migrations)
- Docker & Docker Compose

## Environment Variables
Create a `.env` file in the backend directory with:
```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>"
```
Example:
```
DATABASE_URL="postgresql://postgres:mysecretpass@localhost:5432/lyzerdb"
```
You can add other variables as needed (e.g., `ALLOWED_HOSTS`).

## Setup & Run Instructions

### 1. With Docker

#### Prerequisites
- Docker
- Docker Compose

#### Steps
1. Install dependencies:
   ```bash
   uv pip install -e .
   ```
2. Build and start the database:
   ```bash
   docker compose up -d
   ```
3. Apply Alembic migrations:
   ```bash
   alembic upgrade head
   ```
4. Start the FastAPI app:
   ```bash
   python main.py
   ```
   or (for hot reload):
   ```bash
   uvicorn main:app --reload
   ```

### 2. Without Docker

#### Prerequisites
- PostgreSQL installed and running
- Python 3.12 and pip

#### Steps
1. Install dependencies:
   ```bash
   uv pip install -e .
   ```
2. Ensure your `.env` is configured for your local PostgreSQL instance.
3. Apply Alembic migrations:
   ```bash
   alembic upgrade head
   ```
4. Start the FastAPI app:
   ```bash
   python main.py
   ```
   or (for hot reload):
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints
- `/api/calendar/event_type` - Get all event types
- `/api/calendar/available_slots` - Get available slots
- `/api/calendar/book` - Book a slot

## Data Files
- `data/slot_types.json` - Slot types and durations
- `data/slots.json` - Slot timings and availability

## Notes
- Update environment variables as needed for your setup.
- For development, use hot reload with Uvicorn.
