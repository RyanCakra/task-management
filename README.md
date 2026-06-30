# Task Management System

A full stack task management app where authenticated users can manage their own personal tasks.

**Live Demo**
- Frontend: https://task-management-umber-chi.vercel.app
- Backend API: https://task-management-production-a2e4.up.railway.app

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript, MySQL, Prisma ORM
- **Auth:** JWT, protected routes, password hashing with Bcrypt

## Features

- Register, login, logout
- Dashboard showing total, completed, and pending tasks
- Create, view, update, and delete tasks
- Mark tasks as Completed / Pending
- Each task has a title, description, status, and due date
- Consistent JSON API response format
- Responsive UI with loading and empty states

## Project Structure

```
.
├── backend/    # Express.js API
└── frontend/   # Next.js app
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A running MySQL server

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your own values
npx prisma migrate deploy
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # fill in your own values
npm run dev
```

## Environment Variables

### `backend/.env`

```dotenv
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
FRONTEND_URL=
```

### `frontend/.env.local`

```dotenv
NEXT_PUBLIC_API_URL=
```

## Database Setup

Schema is defined in `backend/prisma/schema.prisma` with two tables:

- **Users:** id, name, email, password, created_at, updated_at
- **Tasks:** id, title, description, status, due_date, user_id, created_at, updated_at

Apply the schema to your database:

```bash
npx prisma migrate deploy
```

## API Endpoints

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {}
}
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and get a JWT |
| GET | `/api/tasks` | Get all tasks for the logged-in user |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/status` | Update task status |

## Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Railway**, with a MySQL instance also hosted on Railway

## Scripts

| Command | Backend | Frontend |
|---|---|---|
| `npm run dev` | Run in development | Run in development |
| `npm run build` | Compile + generate Prisma client | Build for production |
| `npm start` | Run production build | Serve production build |

---

Built as part of a Full Stack Developer technical assessment.
