# The Vault

A modern, colorful, and secure notes app inspired by Google’s playful style.

Mainly built to practice MERN CRUD operations on something

## Features
- Secure authentication (signup, login, logout)
- Create, edit, and delete notes
- Beautiful, responsive UI with Google colors
- Private notes for each user
- Modern React + Material-UI frontend
- Express + MongoDB backend

## Tech Stack
- **Frontend:** React, Zustand, Material-UI (MUI)
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, HTTP-only cookies

## Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
# In your terminal
 git clone <your-repo-url>
 cd <your-repo-folder>
```

### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` in the `backend/` folder and fill in your MongoDB URI and JWT secret.

### 4. Start the backend
```bash
cd backend
npm run dev
```

### 5. Start the frontend
```bash
cd frontend
npm start
```

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:4000](http://localhost:4000)

## Usage
- Sign up for a new account or log in with an existing one.
- Create, edit, and delete your notes securely.
- Enjoy a beautiful, playful UI!

## Folder Structure
```
repo/
  backend/    # Express API, MongoDB models, controllers
  frontend/   # React app, Material-UI, Zustand stores
```

## License
MIT 