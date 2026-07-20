# Contributing to GraminPulse

Thank you for your interest in contributing to **GraminPulse**! We welcome contributions from developers, designers, and domain experts to help empower rural micro-enterprises and field officers with AI and financial tools.

---

## 📜 Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Get Started](#how-to-get-started)
3. [Development Workflow](#development-workflow)
4. [Git Branching & Commit Conventions](#git-branching--commit-conventions)
5. [Coding Standards](#coding-standards)
6. [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)

---

## 🤝 Code of Conduct

- **Be Respectful**: Treat all community members with kindness, empathy, and respect.
- **Constructive Feedback**: Provide constructive, helpful feedback on issue discussions and code reviews.
- **Focus on Impact**: Keep the mission of serving rural micro-enterprises at the core of all technical decisions.

---

## 🚀 How to Get Started

1. **Fork the Repository**: Create your own copy of the GraminPulse repo on GitHub.
2. **Clone Locally**:
   ```bash
   git clone https://github.com/<your-username>/GraminPulse.git
   cd GraminPulse
   ```
3. **Set Up MongoDB**: Ensure local MongoDB Community Server is running on port `27017` or configure a cloud connection URI in `backend/.env`.
4. **Set Up & Run Backend**:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run seed
   npm run dev
   ```
5. **Set Up & Run Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🛠️ Development Workflow

- **Backend**: Express.js + TypeScript (`backend/src/`). Test TypeScript compilation using `npm run build` inside `backend/`.
- **Frontend**: React 18 + Vite + Tailwind CSS (`frontend/src/`). Test Vite build using `npm run build` inside `frontend/`.

---

## 🌿 Git Branching & Commit Conventions

- **Main Branch**: `main` contains stable, production-ready code.
- **Branch Naming**:
  - Features: `feature/short-description` (e.g. `feature/jwt-auth`)
  - Bug Fixes: `fix/short-description` (e.g. `fix/telemetry-chart-render`)
  - Documentation: `docs/short-description` (e.g. `docs/api-guide`)

### Commit Message Guidelines
Use clear, imperative commit messages:
```text
feat: add JWT authentication to backend authController
fix: resolve mobile navigation backdrop overflow
docs: update API reference table in README
```

---

## 📐 Coding Standards

### TypeScript / JavaScript (Backend)
- Use **strict typing** for interfaces, models, and controller request/response handlers.
- Handle all async operations with `try/catch` blocks and return standardized JSON error payloads:
  ```json
  {
    "success": false,
    "message": "Human-readable error description"
  }
  ```

### React / Tailwind CSS (Frontend)
- Build modular, functional React components with clean prop handling.
- Adhere strictly to the **Eco-Rural Premium** design system defined in `design_system.md`:
  - Primary Green: `#003820` / `#0f5132`
  - Soft Mint: `#d1e7dd`
  - Headlines: `Manrope` font
  - Body: `Work Sans` font
  - Rounded Bento Cards: `24px` / `rounded-2xl`

---

## 📥 Submitting a Pull Request (PR)

1. Ensure both frontend and backend builds pass without errors:
   ```bash
   cd backend && npm run build
   cd ../frontend && npm run build
   ```
2. Push your feature branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a **Pull Request** targeting the `main` branch of `mahavirb22/GraminPulse`.
4. Provide a detailed summary of changes, screenshot/screen recording for UI updates, and test results in the PR description.

Thank you for building with us to empower rural enterprises! 🌾✨
