# Task Management API (Express + MongoDB)

A simple REST API for managing tasks. Built for the "Assignment for New Joiners - Backend Intern".

## Features
- Create, list, read and delete tasks
- MongoDB for persistence (via Mongoose)
- Input validation (express-validator)
- Centralized error handling middleware
- Clean JSON responses and proper HTTP status codes

## Tech
- Node.js, Express.js
- MongoDB, Mongoose
- express-validator, morgan, cors, dotenv
- nodemon (dev)

## Getting Started

### 1) Prerequisites
- Node.js 18+
- MongoDB running locally or provisioned (e.g., Atlas)

### 2) Install
```bash
npm install
cp .env.example .env
# Edit .env as needed (PORT, MONGODB_URI)
```

### 3) Run
```bash
npm run dev   # with nodemon
# or
npm start
```

Server starts at `http://localhost:$PORT` (default `3000`).

### 4) Health Check
```bash
curl http://localhost:3000/
```

## API

### Create Task
**POST** `/tasks`  
Body (JSON):
```json
{ "title": "Buy milk", "description": "2L full cream", "status": "pending" }
```
Responses:
- `201 Created` + created task JSON
- `422 Unprocessable Entity` if validation fails

### List Tasks
**GET** `/tasks`  
Responses:
- `200 OK` + array of tasks

### Get Task by ID
**GET** `/tasks/:id`  
Responses:
- `200 OK` + task JSON
- `404 Not Found` if not found
- `422 Unprocessable Entity` if invalid id

### Delete Task
**DELETE** `/tasks/:id`  
Responses:
- `204 No Content` on success
- `404 Not Found` if not found
- `422 Unprocessable Entity` if invalid id

## Data Model
```ts
Task {
  id: string;          // auto-generated
  title: string;       // required
  description?: string // optional
  status: 'pending' | 'in-progress' | 'completed' // default 'pending'
  createdAt: string;   // ISO timestamp
  updatedAt: string;   // ISO timestamp
}
```

## Example cURL

```bash
# Create
curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json"   -d '{"title":"Buy milk","description":"2L full cream"}'

# List
curl http://localhost:3000/tasks

# Read
curl http://localhost:3000/tasks/<id>

# Delete
curl -X DELETE http://localhost:3000/tasks/<id>
```

## Postman
Import the Postman collection at `postman/Task API.postman_collection.json`.

## Project Hygiene
- Use the provided `.gitignore`.
- Commit often with meaningful messages.
- Open a PR from `feature/task-api` to `main` when done.

## Notes
- To run MongoDB locally via Docker:
```bash
docker run -d --name mongo -p 27017:27017 -v mongo_data:/data/db mongo:7
```
- Ensure your `MONGODB_URI` in `.env` matches your setup (local or Atlas).
Branch: feature/task-api
