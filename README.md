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

---

# Backend + DevOps Interview — Hands-On Task

This section is for the candidate. The interviewer will tell you **which one task** to complete. Each task covers both backend code and DevOps/infrastructure work — both are expected.

## Setup Before You Begin

1. Clone this repo
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create `backend/.env`:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=anysecretkey
   PORT=8000
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Verify it is running:
   ```bash
   curl http://localhost:8000/api/health
   ```

You do not need to touch the frontend for any task.

---

## Task 1 — Containerize the App and Fix Production Configuration

**Time allowed: 75–90 minutes**

The backend has no Docker setup and several configuration issues that would fail in a real production environment. Fix both together.

**Backend part — files to work in:**
- `backend/index.js`
- `backend/package.json`

**DevOps part — files to create:**
- `backend/Dockerfile`
- `backend/.dockerignore`
- `docker-compose.yml` (repo root)

**Requirements:**

**A. Fix the backend for production**

1. The `"start"` script in `package.json` runs `nodemon` — a dev-only tool. Fix it:
   - `"start"` → `node index.js`
   - `"dev"` → `nodemon index.js`

2. Validate required env vars on startup. Currently only `MONGO_URI` is checked. Add `JWT_SECRET`. If either is missing, print a clear error and `process.exit(1)`.

3. Replace `origin: "*"` CORS config:
   - Read allowed origin from `CORS_ORIGIN` env var
   - Fall back to `http://localhost:3000` only when `NODE_ENV !== 'production'`
   - Refuse to start in production if `CORS_ORIGIN` is not set

**B. Dockerize the backend**

4. Write `backend/Dockerfile`:
   - Base image: `node:18-alpine`
   - Install only production dependencies (`--omit=dev`)
   - Expose port `8000`, start with `node index.js`

5. Write `backend/.dockerignore` — exclude: `node_modules`, `.env`, `uploads/`, `invoices/`, `*.log`

6. Write `docker-compose.yml` with two services:

   | Service | Config |
   |---|---|
   | `mongo` | `mongo:6` image, named volume for data persistence |
   | `backend` | Built from `./backend`, depends on `mongo`, port `8000:8000` |

   Env vars for the `backend` service:
   ```
   MONGO_URI=mongodb://mongo:27017/mylogistix
   JWT_SECRET=interviewsecret
   PORT=8000
   NODE_ENV=production
   CORS_ORIGIN=http://localhost:3000
   ```

7. The backend must not crash if Mongo takes a few seconds to become ready. Handle startup resilience.

**Test it:**
```bash
# Env validation — must refuse to start
MONGO_URI=mongodb://localhost:27017/test node index.js

# Full stack startup — one command, no manual steps
docker-compose up --build
curl http://localhost:8000/api/health   # must return 200

# Data must survive a restart
docker-compose down && docker-compose up -d
# previously created records should still be there
```

**Bonus (verbal only):**
> How would you add a dev mode with nodemon hot-reload to this Docker setup without touching the production Dockerfile?

---

## Task 2 — Add Pagination, Search, and Structured Logging

**Time allowed: 75–90 minutes**

The `GET /createorder/allorders` API dumps every record with no filtering, and the entire codebase uses raw `console.log` with no structure or log levels.

**Backend part — files to work in:**
- `backend/controllers/orderController.js`
- `backend/routes/orderRoutes.js`

**DevOps part — files to create/edit:**
- `backend/utils/logger.js` (create new)
- `backend/index.js`
- `backend/controllers/walletController.js`
- `backend/controllers/userController.js`

**Requirements:**

**A. Pagination and search on the orders list**

1. Support `?page=1&limit=10` on `GET /createorder/allorders`. Defaults: `page=1`, `limit=10`. Cap `limit` at `50`.
2. Support `?search=ML0001` — partial, case-insensitive match on the `orderId` field.
3. Response envelope:
   ```json
   { "data": [...], "total": 100, "page": 1, "limit": 10, "totalPages": 10 }
   ```
4. Page beyond range → return empty `data` array, not an error.

**B. Structured logging**

5. Install packages:
   ```bash
   npm install winston morgan
   ```

6. Create `backend/utils/logger.js` using Winston:
   - **Development** (`NODE_ENV !== 'production'`): coloured, human-readable console output with timestamps
   - **Production** (`NODE_ENV=production`): write JSON lines to `backend/logs/app.log`; errors also to `backend/logs/error.log`
   - Log levels: `error`, `warn`, `info`, `debug`

7. In `backend/index.js`:
   - Replace `console.log` / `console.error` with `logger.info` / `logger.error`
   - Add `morgan` HTTP request logging — `'dev'` format in dev, `'combined'` in production
   - Skip morgan for `GET /api/health` to avoid noise

8. In `walletController.js` and `userController.js` replace all `console.error` / `console.log` calls with the logger.

9. Add `backend/logs/` to `.gitignore`.

**Test it:**
```bash
# Pagination
curl "http://localhost:8000/createorder/allorders?page=1&limit=5"
curl "http://localhost:8000/createorder/allorders?search=ML000"
curl "http://localhost:8000/createorder/allorders?page=9999"   # expect empty data

# Dev logging — coloured output in terminal
NODE_ENV=development npm start

# Prod logging — JSON files
NODE_ENV=production node index.js
cat backend/logs/app.log
```

**Bonus (verbal only):**
> You have 10 backend instances each writing their own log files. How do you centralise and search them? Name one tool or service.

---

## Task 3 — Fix Auth Bugs, Rate Limit OTP, and Add Real Health Checks

**Time allowed: 75–90 minutes**

There are bugs in the customer CRUD routes, the OTP endpoints are completely unprotected, and the health endpoint always returns OK even when MongoDB is down.

**Backend part — files to work in:**
- `backend/routes/userRoutes.js`
- `backend/controllers/userController.js`
- `backend/middleware/authMiddleware.js`

**DevOps part — files to work in:**
- `backend/index.js`
- `backend/routes/userRoutes.js`

**Requirements:**

**A. Fix the broken customer routes**

1. `GET /CustList/:id` takes an `:id` param but the controller ignores it and returns all users. Fix:
   - `GET /CustList` → all customers
   - `GET /CustList/:id` → single customer by ID, return `404` if not found

2. `DELETE /Custs/:id` currently deletes **all** customers regardless of the ID param. Fix to delete only the matching customer.

3. Add `verifyToken` middleware to all customer CRUD routes (`CustCreate`, `CustList`, `CustList/:id`, `Custs/:id`, `Cust/:id`).

**B. Rate limit the OTP routes**

4. Install `express-rate-limit`:
   ```bash
   npm install express-rate-limit
   ```

5. Apply a limiter to `POST /get-otp` and `POST /verify-otp`: max **5 requests per IP per 15 minutes**. On breach return `429`:
   ```json
   { "success": false, "message": "Too many OTP requests. Please try again after 15 minutes." }
   ```

6. Apply a separate global limiter (100 req / 15 min) to all routes in `index.js`. The global limiter must not override the stricter OTP limiter.

**C. Fix the health check**

7. `GET /api/health` currently returns `200` even when MongoDB is down. Split into two endpoints — both defined **before** any route middleware:

   - `GET /api/health` — liveness: always `200` as long as the process is running, returns `{ "status": "ok", "uptime": <seconds> }`
   - `GET /api/ready` — readiness: returns `200` only when the database is connected, otherwise `503` with `{ "status": "not ready", "db": "disconnected" }`

**Test it:**
```bash
# Auth bug — call without token, expect 401
curl http://localhost:8000/CustList

# Rate limit — 6th call must return 429
for i in {1..6}; do
  curl -s -X POST http://localhost:8000/get-otp \
    -H "Content-Type: application/json" \
    -d '{"phoneNumber":"9876543210"}'
done

# Readiness check with DB down — expect 503
curl -o /dev/null -s -w "%{http_code}" http://localhost:8000/api/ready
```

**Bonus (verbal only):**
> In Kubernetes, what is the difference between a `livenessProbe` and a `readinessProbe`? What happens to a pod when each one fails?

---

## Task 4 — Global Error Handling, Security Headers, and Graceful Shutdown

**Time allowed: 75–90 minutes**

Every controller has its own `try/catch → res.status(500)`. There are no security headers and the server drops connections immediately when stopped.

**Backend part — files to work in:**
- `backend/middleware/` (create `errorMiddleware.js`)
- `backend/controllers/walletController.js`
- `backend/index.js`

**DevOps part — files to work in:**
- `backend/index.js`
- `backend/package.json`

**Requirements:**

**A. Global error handling middleware**

1. Create `backend/middleware/errorMiddleware.js` — Express 4-argument handler: `(err, req, res, next) => {}`.

2. Map these error types to HTTP status codes:

   | Error Type | HTTP Status |
   |---|---|
   | Mongoose `CastError` (bad ObjectId) | `400 Bad Request` |
   | Mongoose `ValidationError` | `422 Unprocessable Entity` |
   | JWT `JsonWebTokenError` | `401 Unauthorized` |
   | Everything else | `500 Internal Server Error` |

3. Response shape must always be: `{ "success": false, "message": "...", "code": "CAST_ERROR" }`

4. Register it at the very bottom of `index.js`, after all routes.

5. Refactor `rechargeWallet`, `debitWallet`, and `getWallet` in `walletController.js` to replace inline `catch` blocks with `next(err)`.

**B. Security headers and graceful shutdown**

6. Install and mount `helmet` as the **first** middleware in `index.js`:
   ```bash
   npm install helmet
   ```

7. Add graceful shutdown — listen for `SIGTERM` and `SIGINT`:
   - Log that shutdown has started
   - Stop accepting new connections and wait for active requests to finish
   - Close the database connection cleanly
   - Log each step, then exit with code `0`

**Test it:**
```bash
# CastError — expect 400
curl http://localhost:8000/CustList/not-a-valid-id

# Security headers present
curl -I http://localhost:8000/api/health
# Must see: X-Content-Type-Options, X-Frame-Options

# Graceful shutdown — must log steps, not crash abruptly
npm start &
kill -SIGTERM $!
```

**Bonus (verbal only):**
> This Node.js server is single-threaded and uses one CPU core. On a 4-core machine, what are two ways to utilise all cores? What new problem does each approach introduce?

---

## Task 5 — Wallet Transaction Filters and CI Pipeline

**Time allowed: 90 minutes**

The wallet has no API to search its transaction history, and the repo has no automated pipeline to catch broken code before it merges.

**Backend part — files to work in:**
- `backend/models/walletSchema.js`
- `backend/controllers/walletController.js`
- `backend/routes/` (new route file or extend existing)
- `backend/index.js`

**DevOps part — files to create:**
- `.github/workflows/ci.yml`
- `backend/Dockerfile` (needed by the CI pipeline's docker build job)

**Requirements:**

**A. Wallet transaction history API**

1. Add `GET /wallet/transactions/:userId` with optional query params:
   - `?type=credit` — filter by type (`credit`, `debit`, `refund`)
   - `?from=2024-01-01&to=2024-12-31` — date range, inclusive
   - `?page=1&limit=10` — pagination

2. Response:
   ```json
   { "balance": 500, "transactions": [...], "total": 25, "page": 1, "limit": 10 }
   ```

3. Filtering **must happen inside MongoDB** — not in JavaScript after the data is fetched.

4. Return `404` if no wallet exists for the given `userId`.

**B. GitHub Actions CI pipeline**

5. Create `.github/workflows/ci.yml` that triggers on push to `main` and on pull requests to `main`.

6. Run two jobs in order:

   **Job 1 — `lint`**
   - Node.js 18, install deps in `backend/`
   - Fail the job if any `.js` file under `backend/` (excluding `node_modules`) contains a raw `console.log`

   **Job 2 — `build-docker`** (runs only if `lint` passes)
   - Build the Docker image from `backend/Dockerfile`, tag it `mylogistix-backend:ci`
   - Job fails if the build fails

7. Each job must print the Node.js version as its first step.

**Test it:**
```bash
# Wallet filters
curl "http://localhost:8000/wallet/transactions/<userId>?type=credit"
curl "http://localhost:8000/wallet/transactions/<userId>?from=2024-01-01&to=2024-12-31"
curl "http://localhost:8000/wallet/transactions/<userId>?page=1&limit=5"

# CI — push a branch with a console.log — lint job must fail
# Fix it — both jobs must pass
# Break the Dockerfile syntax — build-docker job must fail
```

**Bonus (verbal only):**
> Where would you add a step to push the Docker image to a registry after a successful build? What GitHub secrets would you configure?

---

## General Expectations

- Your code must work end-to-end without manual intervention from the interviewer.
- Handle edge cases and return appropriate HTTP status codes — don't only handle the happy path.
- Keep your code clean and consistent with the existing style in the repo.
- Be ready to walk the interviewer through your approach and explain your decisions.
