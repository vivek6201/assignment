# Assignment Lysr Frontend

A modern booking application frontend built with React, TypeScript, Vite, and shadcn UI.

## Tech Stack

- **React** (with TypeScript)
- **Vite** (development/build tool)
- **Shadcn UI** (component library)
- **Tailwind CSS** (utility-first CSS framework)
- **PNPM** (package manager)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install Dependencies

Make sure you have [PNPM](https://pnpm.io/) installed:

```bash
pnpm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

### 4. Run the Development Server

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for Production

```bash
pnpm build
```

## Features

- Booking list in beautiful card format
- Modal booking form
- Responsive UI
- API integration for bookings
