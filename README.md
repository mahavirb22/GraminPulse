# GraminPulse - MERN Stack Rural Fintech Application

**GraminPulse** is an AI-assisted financial management and IoT risk diagnostic application for rural micro-enterprises and field officers in India. It features a modern **React 18 + Tailwind CSS** frontend, an **Express.js + TypeScript** backend, real-time **IoT Telemetry Simulation**, and an **Explainable AI (XAI) & RAG Advisory Engine**.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Database Setup (MongoDB)](#-database-setup-mongodb)
3. [Running the Backend Service](#-running-the-backend-service)
4. [Running the Frontend Application](#-running-the-frontend-application)
5. [API Routes & Testing](#-api-routes--testing)
6. [Project Architecture](#-project-architecture)

---

## 📦 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local Community Server OR MongoDB Atlas Cloud connection string)

---

## 🛢️ Database Setup (MongoDB)

You can choose either **Option A (Local MongoDB)** or **Option B (MongoDB Atlas Cloud)**.

### Option A: Local MongoDB (Recommended for quick local testing)
1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and [MongoDB Compass](https://www.mongodb.com/products/tools/compass).
2. Start the MongoDB service on your local machine (Default port: `27017`).
3. Or run MongoDB instantly using Docker:
   ```bash
   docker run -d -p 27017:27017 --name graminpulse-mongo mongo
   ```
4. Your connection URI will be:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/graminpulse
   ```

### Option B: MongoDB Atlas (Cloud Database)
1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free cluster (`M0 Sandbox`).
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect** -> **Drivers** to copy your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/graminpulse?retryWrites=true&w=majority
   ```

---

## ⚡ Running the Backend Service (`backend/`)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file from `.env.example`:
   ```bash
   # On Windows (PowerShell):
   Copy-Item .env.example .env

   # On Linux / macOS:
   cp .env.example .env
   ```

3. Configure your `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/graminpulse
   # Optional: Add your Google Gemini API Key to enable LLM responses
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Install backend dependencies:
   ```bash
   npm install
   ```

5. Seed sample hackathon enterprises, transactions, and IoT telemetry records:
   ```bash
   npm run seed
   ```

6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000` with the background IoT Telemetry Simulator automatically running every 10 seconds.

---

## 💻 Running the Frontend Application (`frontend/`)

1. Open a new terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or `http://localhost:5173`).

---

## 📡 API Routes & Testing

| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/health` | Server & MongoDB connection status check |
| **GET** | `/api/enterprises` | Returns all enterprises with risk status (Field Hub) |
| **GET** | `/api/enterprises/:id` | Returns enterprise populated with transactions & telemetry |
| **POST** | `/api/transactions` | Logs income or expense records |
| **GET** | `/api/telemetry/live/:enterpriseId` | Returns 5 most recent IoT sensor readings |
| **POST** | `/api/telemetry/trigger-anomaly` | Immediately injects critical failure metrics (`15°C Alert`) |
| **GET** | `/api/analytics/advisory/:enterpriseId` | Returns Cash Flow forecast, XAI explanation & RAG advice |
| **POST** | `/api/seed` | Prepopulates MongoDB with sample data |

---

## 📁 Project Architecture

```text
GraminPulse/
├── backend/                       # Express.js + TypeScript REST API
│   ├── src/
│   │   ├── controllers/           # Route controllers (enterprises, transactions, telemetry, analytics)
│   │   ├── models/                # Mongoose schemas (Enterprise, Transaction, IoTTelemetry)
│   │   ├── services/              # IoT Telemetry Simulator & XAI/RAG Advisory Engine
│   │   ├── routes/                # Express API router
│   │   ├── seed.ts                # Database seed script
│   │   └── server.ts              # Entrypoint server
│   ├── package.json
│   └── tsconfig.json
├── frontend/                      # React 18 + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── components/            # Reusable UI components (StatCard, RiskBadge, Telemetry, Advisory)
│   │   ├── views/                 # Core views (Dashboard, Field Hub, Risk Profile)
│   │   └── App.jsx                # Application root & layout router
│   ├── package.json
│   └── tailwind.config.js
├── design_system.md               # Eco-Rural Premium design system specs
└── README.md                      # Project setup & documentation
```
