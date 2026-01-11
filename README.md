# Write From Your Heart

A distraction-free writing application for students — built for the **WIN12: Write from your heart** challenge of Winterthon 2026.

Write From Your Heart gives students a peaceful, minimalist environment to write essays, notes, or reflections, with automatic saving, multiple notes support, and secure login. The app lets users revisit past writings and delete or open any note they want — helping build consistent writing habits without pressure or distraction.

---
## Team Members:
- Abhishek Aryan
- Vindhya Guttula (https://github.com/vindhya-tech)
- Aishwwarya Aryan (https://github.com/AishwaryaAryan)
- Nisha M (https://github.com/NishaManivannan1)

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [API Endpoints](#api-endpoints)  
- [Notes & Tips](#notes--tips)  
- [License](#license)

---

## Demo

**Video Pitch (2-min)**  
[https://docs.google.com/document/d/1V42XIiZTqi5i2lA5OBp_-eNJmqCQ6Y24Sn66slBjars/edit?tab=t.0](https://drive.google.com/file/d/1Qn8uckmxihgLv_nAaxynN649739dcHxr/view)

**PPT presentation**
[https://docs.google.com/presentation/d/1M0m30inJOFlBK_WRgjO_d_Mtm7J3UBhN/edit?usp=sharing&ouid=108875841002195971114&rtpof=true&sd=true](https://drive.google.com/file/d/1Qn8uckmxihgLv_nAaxynN649739dcHxr/view)


## Features

- Secure user authentication (register / login)
- Dashboard listing notes with last edited timestamp
- Create, read, update, and delete (CRUD) notes
- Automatic periodic saving
- Local draft storage fallback
- Mobile-friendly and minimalist UI
- History navigation by note

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React (Vite) + React Router |
| Backend | Node.js + Express |
| Database | MongoDB (local or Atlas) |
| Auth | JWT (JSON Web Tokens) |
| Styling | Custom CSS |

---

## Getting Started

### Prerequisites

Install the following before you begin:

- Node.js (v16+)
- MongoDB Community (local) or MongoDB Atlas
- npm / yarn

---

### Environment Setup

Create a .env file inside the backend directory:

MONGO_URI=mongodb://127.0.0.1:27017/writefromyourheart
JWT_SECRET=your_jwt_secret
PORT=5000

### Backend Setup
cd backend
npm install
npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev

### Update the API baseURL in:
src/Services/api.js
to match your backend origin:
baseURL: "http://127.0.0.1:5000/api"



