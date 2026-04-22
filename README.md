<p align="center">
  <img src="Frontend/assets/images/icon.png" alt="MidRemind App Icon" width="120" />
</p>

<h1 align="center">MidRemind — Medicine Reminder App</h1>

<p align="center">
  <img src="Frontend/assets/images/logo.png" alt="MidRemind Banner" width="480" />
</p>

A full-stack mobile application that helps users manage their daily medication schedules, track dose history, and receive push notifications for medication reminders.


---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Download](#download)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Reference](#api-reference)

---

## Features

- **User Authentication** — Sign up, log in, forgot password with email verification code, and password reset
- **Medication Management** — Add medications with name, dosage, frequency, duration (fixed days or ongoing), start date, and scheduled dose times
- **Daily Dashboard** — View today's scheduled doses with a circular progress indicator showing completion percentage
- **Dose Tracking** — Mark individual doses as taken; missed doses are automatically detected based on scheduled times
- **Dose History** — Browse the full history of all medications and their daily dose logs
- **Refill Tracker** — Monitor current supply levels; track which medications need refilling based on configurable thresholds
- **Calendar View** — Visualize medication schedules across dates
- **Push Notifications** — Daily local notifications scheduled per medication time; automatically cancelled when a dose is marked taken or a medication is deleted
- **Persistent Auth** — User session persisted via AsyncStorage with Redux state management
- **Skeleton Loading** — Animated skeleton placeholders while data is being fetched

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| bcryptjs | Password hashing |
| Nodemailer | Email delivery for password reset codes |
| dotenv | Environment variable management |
| nodemon | Development auto-restart |

### Frontend
| Technology | Purpose |
|---|---|
| React Native (Expo SDK 55) | Cross-platform mobile framework |
| Expo Router | File-based navigation |
| TypeScript | Type safety |
| Redux Toolkit | Global state management |
| Axios | HTTP client |
| NativeWind + Tailwind CSS | Utility-first styling |
| expo-notifications | Local push notification scheduling |
| AsyncStorage | Persistent local storage |
| expo-linear-gradient | Gradient UI elements |
| react-native-svg | Circular progress chart |
| react-native-toast-message | In-app toast notifications |

---

## Project Structure

```
midremind/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # Signup, login, forgot/reset password
│   │   │   └── medicine.controller.js   # CRUD, dose tracking, refill logic
│   │   ├── db/
│   │   │   └── index.js                 # MongoDB connection
│   │   ├── email/
│   │   │   └── template.js              # Email HTML templates
│   │   ├── models/
│   │   │   ├── user.model.js            # User schema with bcrypt hooks
│   │   │   ├── medicine.model.js        # Medication schema
│   │   │   └── medicinelog.model.js     # Dose log schema (nested doses array)
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── medicine.routes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js          # Async error wrapper
│   │   │   └── sendEmail.js             # Nodemailer helper
│   │   ├── app.js                       # Express app setup and middleware
│   │   └── index.js                     # Server entry point
│   ├── .env
│   └── package.json
│
└── Frontend/
    ├── app/
    │   ├── (auth)/                      # Auth screens: sign-in, sign-up, forgot/reset password
    │   ├── (main)/
    │   │   └── home.tsx                 # Main dashboard with today's doses
    │   ├── (profile)/                   # Profile and edit profile screens
    │   ├── calendar/                    # Calendar view
    │   ├── history/                     # Dose history log
    │   ├── medications/                 # Add medication screen
    │   ├── refills/                     # Refill tracker screen
    │   ├── welcome.tsx                  # Welcome/onboarding screen
    │   └── _layout.tsx                  # Root layout
    ├── components/                      # Shared UI components (Button, Input, Header, etc.)
    ├── constants/
    │   ├── api.ts                       # API base URL constant
    │   └── theme.ts                     # App theme tokens
    ├── modules/auth/
    │   ├── components/                  # Auth form components
    │   ├── hooks/                       # useAuth, useMedicine hooks
    │   └── services/                    # Axios API call functions
    ├── services/
    │   └── notificationService.ts       # Expo push notification scheduling
    ├── store/
    │   ├── authSlice.ts                 # Auth Redux slice
    │   ├── medicineSlice.ts             # Medicine Redux slice
    │   └── store.ts                     # Redux store configuration
    ├── theme/
    │   ├── colors.ts
    │   └── dimensions.ts
    ├── app.json                         # Expo configuration
    └── package.json
```

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **MongoDB** — A running MongoDB instance or Atlas cluster
- **Expo CLI** — `npm install -g expo-cli`
- **Android Studio** or **Xcode** for native builds (optional; Expo Go works for development)
- **Gmail account** (or SMTP credentials) for sending password reset emails

---

## Environment Variables

### Backend (`Backend/.env`)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORTAL_EMAIL` | Gmail address used to send password reset emails |
| `PORTAL_PASSWORD` | Gmail app password (not the account password) |
| `ALLOWED_ORIGIN` | Comma-separated allowed CORS origins |

### Frontend (`Frontend/.env`)

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_URL` | Base URL of the deployed backend API (must end with `/api/v1/`) |

---

## Getting Started

### Backend

```bash
cd Backend
npm install
npm run dev
```

The server starts with `nodemon` and connects to MongoDB on each request. The default entry point is `src/index.js`.

### Frontend

```bash
cd Frontend
npm install
npx expo start
```

Then press:
- `a` — open Android emulator
- `i` — open iOS simulator
- `w` — open in browser
- Scan the QR code with **Expo Go** on a physical device

To build a native Android APK:

```bash
npx expo run:android
```

---

## Download

Pre-built APKs are published as [GitHub Releases](https://github.com/Muhammad-Ahmed-Official/midremind/releases).

### How to upload a new release

1. Build the APK locally or via EAS:
   ```bash
   # Local build
   cd Frontend
   npx expo run:android --variant release

   # Or via EAS Build (requires EAS CLI and login)
   eas build --platform android --profile preview
   ```
2. Go to [github.com/Muhammad-Ahmed-Official/midremind/releases/new](https://github.com/Muhammad-Ahmed-Official/midremind/releases/new)
3. Create a new tag (e.g. `v1.0.0`), add release notes, and attach the `.apk` file
4. Publish — the **Download APK** badge at the top of this README will automatically link to the latest release

### Install on Android

1. Download the `.apk` from the [latest release](https://github.com/Muhammad-Ahmed-Official/midremind/releases/latest)
2. On your Android device, enable **Install from unknown sources** in Settings → Security
3. Open the downloaded file to install

---

## API Reference

All routes are prefixed with `/api/v1`.

### Auth — `/api/v1/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Log in and receive user data |
| `POST` | `/forgot-password` | Send a 6-digit OTP to the user's email (valid 30 min) |
| `POST` | `/change-password` | Reset password using the OTP |

### Medicine — `/api/v1/medicine`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/createMedicine` | Add a new medication and pre-generate dose logs |
| `GET` | `/` | Get today's scheduled doses for a user |
| `GET` | `/history` | Get full dose history for all of a user's medications |
| `PATCH` | `/markTaken` | Mark a specific dose as taken and decrement supply |
| `DELETE` | `/deleteMedicine` | Delete a medication and all associated logs |
| `GET` | `/refillMedicine` | Get medications with refill reminders enabled |
