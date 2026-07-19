# GraminPulse - Rural Fintech UI

**GraminPulse** is an AI-assisted rural financial management and risk diagnostic application tailored for rural micro-enterprises and field officers. Built with React 18, Vite, and Tailwind CSS based on the **Eco-Rural Premium** design system.

---

## 🚀 Quick Start

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Key Views & Features

1. **Micro-Enterprise Dashboard** (`<MicroEnterpriseDashboard />`)
   - SVG Cash Flow chart (+12% growth tracking)
   - Quick log forms for **Income** and **Expense** transactions
   - Glassmorphism **AI Advisory** alert banner
   - **Live IoT Telemetry** monitoring (Cold Storage Temp, Chiller Motor status)

2. **Field Officer Hub** (`<FieldOfficerHub />`)
   - Enterprise portfolio grid with dynamic search bar filtering
   - Sector category pills (*Agriculture*, *Poultry*, *Dairy*, *Artisan*)
   - Risk status chips (*Stable*, *Warning*, *Action Required*, *Elevated Risk*)

3. **Enterprise Risk Profile** (`<EnterpriseRiskProfile />`)
   - Simulated `useEffect` deep-dive diagnostic loading
   - 3-Month cash flow forecast with projected deficit warnings
   - Interactive early warning signals timeline
   - Diagnostic risk panel (*Liquidity*, *Supply Chain*, *Crop Yield*, *Market Price*)

---

## 🛠️ Tech Stack & Design System

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Theme Tokens)
- **Typography**: Manrope (Headlines) & Work Sans (Body/Labels)
- **Icons**: Material Symbols Outlined
- **Theme Palette**:
  - Primary: Deep Emerald (`#003820` / `#0f5132`)
  - Secondary: Soft Mint (`#d1e7dd`)
  - Surface: Off-White (`#f8f9fa`)
  - Accent: Sienna (`#571e00`)

---

## 📁 Project Structure

```text
GraminPulse/
├── frontend/                     # React application source code
│   ├── src/
│   │   ├── components/           # Reusable UI components (StatCard, RiskBadge, Telemetry, etc.)
│   │   ├── views/                # Page views (Dashboard, Field Hub, Risk Profile)
│   │   ├── App.jsx               # Layout navigation router
│   │   └── main.jsx              # Entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── design_system.md              # Eco-Rural Premium design specifications
└── README.md
```
