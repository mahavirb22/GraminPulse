# GraminPulse - MERN Stack Rural Fintech Application

**GraminPulse** is an AI-assisted financial management, Explainable AI (XAI) risk diagnostic, and real-time IoT monitoring platform engineered for rural micro-enterprises and field officers in India. 

It features a modern **React 18 + Tailwind CSS** frontend, a rate-limited **Express.js + TypeScript** backend, real-time **IoT Telemetry Simulation**, and a **Google Gemini-powered Explainable AI (XAI) & RAG Advisory Engine**.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack](#-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Database Setup (MongoDB)](#-database-setup-mongodb)
5. [Running the Backend Service](#-running-the-backend-service)
6. [Running the Frontend Application](#-running-the-frontend-application)
7. [Security & Validation Features](#-security--validation-features)
8. [Explainable AI (XAI) & IoT Simulator](#-explainable-ai-xai--iot-simulator)
9. [Complete API Reference](#-complete-api-reference)
10. [Project Architecture](#-project-architecture)

---

## ✨ Key Features

- 🔐 **Real MongoDB User Authentication**: Sign Up & Sign In with password hashing (`bcryptjs`), 10-digit Indian phone regex validation, and rate-limiting brute-force protection.
- 👤 **Personalized Initial Letter Avatars**: Dynamic circular avatar badges displaying the user's capitalized first letter (e.g. **'M'** for Mahavir).
- 🌱 **Fresh User Account Initialization**: Newly registered users automatically get a clean enterprise record in MongoDB with 0 pre-filled transaction logs so they can start fresh.
- 📊 **Interactive Micro-Enterprise Dashboard**:
  - Real-time **Cash In vs Cash Out** SVG graph with timeframe toggles (30 Days / 90 Days) and **CSV Data Export**.
  - **Generate Report Button**: Downloads a text summary file (`GraminPulse_Monthly_Summary.txt`).
  - **Web SpeechSynthesis Audio**: "Listen to Advice" button speaks AI advisories aloud with Play/Pause controls.
  - **Notification History Drawer**: Click the notification bell to view a modal listing all money added (+) and money decreased (-) with category breakdowns.
- 🌾 **Field Officer Hub**: Manage regional micro-enterprises with sector filters (*Dairy*, *Agriculture*, *Poultry*, *Artisan*) and search bar.
- 🛡️ **Enterprise Risk Profile**:
  - Deep-dive risk diagnostics and 3-month forecast deficit visualization.
  - **View Full History Modal**: Interactive audit log of historical warnings, inspection events, and repayment status.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Eco-Rural Premium design system)
- **Icons & Fonts**: Material Symbols Outlined, Manrope (Headlines), Work Sans (Body)
- **Audio & Media**: Web SpeechSynthesis API, HTML5 Blob File Downloader

### Backend
- **Runtime & Language**: Node.js + Express.js in TypeScript
- **Database**: MongoDB via Mongoose ORM
- **Security**: `express-rate-limit`, `bcryptjs` password hashing, regex input sanitization
- **AI Engine**: Google Gemini API (`@google/generative-ai` SDK) with fallback Indian rural finance RAG engine

---

## 📦 Prerequisites

- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local Community Server OR MongoDB Atlas Cloud URI)

---

## 🛢️ Database Setup (MongoDB)

### Option A: Local MongoDB (Recommended)
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community) and start the MongoDB service on port `27017`.
2. Or run via Docker:
   ```bash
   docker run -d -p 27017:27017 --name graminpulse-mongo mongo
   ```
3. Default URI: `mongodb://127.0.0.1:27017/graminpulse`

### Option B: MongoDB Atlas (Cloud Database)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Set Network Access to `0.0.0.0/0` and create a Database User.
3. URI: `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/graminpulse?retryWrites=true&w=majority`

---

## ⚡ Running the Backend Service (`backend/`)

1. Navigate to the `backend` folder:
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
   # Optional: Add Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Seed sample hackathon database data:
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000` with the 10-second IoT Telemetry Simulator running automatically.*

---

## 💻 Running the Frontend Application (`frontend/`)

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🔒 Security & Validation Features

- **Rate Limiting (`express-rate-limit`)**: Authentication endpoints (`/api/auth/login` and `/api/auth/signup`) are limited to **10 attempts per 15 minutes per IP** to block brute-force attacks.
- **Mobile Number Validation**: Enforces valid 10-digit Indian phone numbers starting with 6, 7, 8, or 9 (`/^[6-9]\d{9}$/`).
- **Password Complexity**: Requires a minimum of 6 characters containing at least one letter and at least one digit (`/^(?=.*[A-Za-z])(?=.*\d)/`).
- **Input Sanitization**: Trims and sanitizes strings to prevent NoSQL query injection.
- **Real-Time Frontend Error Hints**: Inline error messages rendered dynamically below form fields.

---

## 🧠 Explainable AI (XAI) & IoT Simulator

### Mock IoT Telemetry Simulator
- Runs an automated `setInterval` loop every 10 seconds.
- Queries enterprises in MongoDB and generates mock temperature (`2°C - 6°C`) and vibration (`0.01g - 0.05g`) readings.
- **Demo Trigger Endpoint** (`POST /api/telemetry/trigger-anomaly`): Instantly injects critical failure readings (`15°C Alert`) for live hackathon demos.

### Explainable AI (XAI) & RAG Advisory Engine
- Endpoint `GET /api/analytics/advisory/:enterpriseId` calculates 30-day cash flow predictions and evaluates telemetry alerts.
- Generates a human-understandable XAI explanation string (e.g. *"Predicted 15% revenue drop due to sustained high-temperature alerts indicating inventory spoilage"*).
- Uses Google Gemini API (or domain fallback) to return a strict **2-sentence actionable recommendation**.

---

## 📡 Complete API Reference

| Method | Endpoint | Description |
|---|---|---|
| **POST** | `/api/auth/signup` | Registers new user & initializes enterprise in MongoDB |
| **POST** | `/api/auth/login` | Authenticates mobile number & password via bcrypt |
| **GET** | `/api/enterprises` | Returns enterprises with risk status (Field Hub) |
| **GET** | `/api/enterprises/user/:userId` | Returns enterprise & transactions for a specific user |
| **GET** | `/api/enterprises/:id` | Returns enterprise populated with telemetry & transactions |
| **POST** | `/api/transactions` | Saves new income or expense log to MongoDB |
| **GET** | `/api/telemetry/live/:enterpriseId` | Returns 5 most recent IoT sensor readings |
| **POST** | `/api/telemetry/trigger-anomaly` | Injects critical failure metrics (`15°C Alert`) |
| **GET** | `/api/analytics/advisory/:enterpriseId` | Returns Cash Flow forecast, XAI explanation & RAG advice |
| **POST** | `/api/seed` | Prepopulates MongoDB with sample demo data |

---

## 📁 Project Architecture

```text
GraminPulse/
├── backend/                       # Express.js + TypeScript REST API
│   ├── src/
│   │   ├── controllers/           # Route controllers (auth, enterprises, transactions, telemetry, analytics)
│   │   ├── middleware/            # Rate limiting & security middleware
│   │   ├── models/                # Mongoose schemas (User, Enterprise, Transaction, IoTTelemetry)
│   │   ├── services/              # IoT Telemetry Simulator & XAI/RAG Advisory Engine
│   │   ├── routes/                # Express API router
│   │   ├── seed.ts                # Database seed script
│   │   └── server.ts              # Entrypoint server
│   ├── package.json
│   └── tsconfig.json
├── frontend/                      # React 18 + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── components/            # UI components (UserAvatar, StatCard, RiskBadge, Telemetry, Advisory, Modals)
│   │   ├── views/                 # Core views (AuthScreen, Dashboard, Field Hub, Risk Profile)
│   │   └── App.jsx                # Application root & authentication router
│   ├── package.json
│   └── tailwind.config.js
├── CONTRIBUTING.md                # Contribution guidelines
├── design_system.md               # Eco-Rural Premium design system specs
└── README.md                      # Comprehensive project documentation
```
