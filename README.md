# NewMLAdmin (My_Logisticx)

React frontend + Node/Express backend + MongoDB database.

This repo is organized as:
- `frontend/` - React (UI + API calls from the browser)
- `backend/` - Express server, API routes, MongoDB models/controllers
- `api/` - Vercel-style serverless entrypoints (optional; not required if you deploy `backend/` directly)

## Prerequisites
- Node.js 18+ (recommended)
- MongoDB (local or MongoDB Atlas)

## Local Development

### 1) Backend
1. Go to `backend/`
2. Install dependencies:
   - `npm install`
3. Configure environment variables:
   - Create/edit `backend/.env` with:
     - `MONGO_URI` (required)
     - `JWT_SECRET` (required)
     - `PORT` (optional; default: `8000`)
4. Start the server:
   - `npm start`

Backend health endpoint:
- `GET /api/health`

### 2) Frontend
1. Go to `frontend/`
2. Install dependencies:
   - `npm install`
3. Configure environment variables:
   - Create/edit `frontend/.env` with:
     - `REACT_APP_BASE_URL` (example: `http://localhost:8000`)
4. Start the app:
   - `npm start`

Frontend uses `REACT_APP_BASE_URL` to call the backend.

## OTP (Interview/Demo)
OTP is currently fixed to the default value:
- `123456`

Endpoints involved:
- `POST /get-otp` (backend generates/saves OTP)
- `POST /verify-otp` (backend verifies OTP and issues JWT)

## Create an Admin (seed for testing)

Backend routes:
- `POST /AdminReg`
- `POST /AdminLogin`

If you prefer to create admin via API:

### Register
```bash
curl -X POST "http://localhost:8000/AdminReg" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Interview Admin",
    "email": "admin@demo.com",
    "password": "admin123",
    "role": "Admin",
    "schoolName": "Demo School"
  }'
```

### Login
```bash
curl -X POST "http://localhost:8000/AdminLogin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "admin123"
  }'
```

## CORS
Backend CORS is configured to be open for demo purposes:
- `origin: "*"`

If a frontend deployment uses a different domain, it should still work without CORS changes.

## Environment Files
The repo ignores `*.env` files via `.gitignore` (for example: `backend/.env` and `frontend/.env`), so you should store secrets there locally and in your hosting provider’s “Environment Variables” section.

## Deploy (Frontend + Backend Only)
This is the recommended deployment flow for interviews.

### Backend (Render / Railway / similar)
Deploy `backend/` as a Node server.
Recommended config:
- Root/working directory: `backend`
- Build: `npm install`
- Start: `node index.js`
- Env vars:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production` (recommended)
  - `PORT` (if your platform requires it)

Example backend URL:
- `https://your-backend-domain.com`

### Frontend (Vercel)
Deploy `frontend/` as a React app.
Recommended config:
- Root/working directory: `frontend`
- Env var:
  - `REACT_APP_BASE_URL=https://your-backend-domain.com`

SPA routing:
- `frontend/vercel.json` routes all requests to `index.html`.

## Notes / Security Warning (important)
- OTP being fixed and JWT/admin password behavior are not production-secure.
- For real production, generate random OTPs and never return OTPs in API responses, plus hash/verify admin passwords properly.

# Logistix_Admin
# Logistix_Admin
