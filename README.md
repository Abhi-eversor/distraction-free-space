
# Write From Your Heart

A distraction-free writing application for students — built for the **WIN12: Write From Your Heart** challenge (**Winterthon 2026**).

Write From Your Heart gives students a peaceful, minimalist environment to write essays, notes, or reflections, with automatic saving, multiple-notes support, and secure login. The app lets users revisit past writings and delete or open any note they want — helping build consistent writing habits without pressure or distraction.

## Team Members

- Abhishek Aryan
- Vindhya Guttula: https://github.com/vindhya-tech
- Aishwarya Aryan: https://github.com/AishwaryaAryan
- Nisha M: https://github.com/NishaManivannan1

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Environment Setup](#environment-setup)
	- [Backend Setup](#backend-setup)
	- [Frontend Setup](#frontend-setup)
	- [Update API base URL (frontend)](#update-api-base-url-frontend)
- [API Endpoints](#api-endpoints)
	- [Authentication](#authentication)
	- [Notes / Documents](#notes--documents)

## Demo

**Video Pitch (2-min)**  
[https://docs.google.com/document/d/1V42XIiZTqi5i2lA5OBp_-eNJmqCQ6Y24Sn66slBjars/edit?tab=t.0](https://drive.google.com/file/d/1Qn8uckmxihgLv_nAaxynN649739dcHxr/view)

**PPT presentation**
[https://docs.google.com/presentation/d/1M0m30inJOFlBK_WRgjO_d_Mtm7J3UBhN/edit?usp=sharing&ouid=108875841002195971114&rtpof=true&sd=true](https://drive.google.com/file/d/1Qn8uckmxihgLv_nAaxynN649739dcHxr/view)


## Features

- Secure user authentication (register / login)
- Dashboard listing notes with last edited timestamp
- Create, read, update and delete (CRUD) notes
- Automatic periodic saving (autosave)
- Local draft storage fallback for offline resilience
- Mobile-friendly and minimalist UI for focused writing
- History navigation per note

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (Vite) + React Router |
| Backend | Node.js + Express |
| Database | MongoDB (local or Atlas) |
| Auth | JWT (JSON Web Tokens) |
| Styling | Custom CSS |

## Getting Started

### Prerequisites

Install the following before you begin:

- Node.js (v16 or later)
- MongoDB Community (local) or MongoDB Atlas
- npm (or yarn)

### Environment Setup

Create a `.env` file inside the `backend` directory with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/writefromyourheart
JWT_SECRET=your_jwt_secret
PORT=5000
```

- `MONGO_URI` — local MongoDB connection (or Atlas URI)
- `JWT_SECRET` — a random long string used to sign JWTs
- `PORT` — backend port (default `5000`)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

By default the backend will run at:

http://127.0.0.1:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend (Vite) usually runs at:

http://localhost:5173

### Update API base URL (frontend)

Ensure frontend calls the correct backend origin. Edit:

`frontend/src/Services/api.js`

Example:

```js
import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:5000/api",
});

export default API;
```

## API Endpoints

All API routes require the `Authorization: Bearer <token>` header except register/login.

### Authentication

| Method | Endpoint | Body |
| --- | --- | --- |
| POST | `/api/auth/register` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` |

### Notes / Documents

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/docs` | Get all notes for the logged-in user |
| POST | `/api/docs/create` | Create a new note (`{ title }`) |
| GET | `/api/docs/:id` | Get a single note |
| PUT | `/api/docs/:id` | Update note content (`{ content }`) |
| DELETE | `/api/docs/:id` | Delete a note |



