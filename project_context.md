# Project Context: The Modern Stoic

## 1. Project Overview
**App Name:** StoicApp (Working Title)
**Concept:** A mobile application designed for men focusing on daily self-improvement through Stoic philosophy. It provides a structured system for daily theory and practice rather than just random quotes.

### Core Philosophy
* **Vibe:** Serious, calm, premium, "Brutalist" or "Minimalist."
* **Visual Style:** Monochrome (Black, White, Greys) or Earth Tones.
* **Goal:** To help users build a "Chain of Iron" (habits) through daily consistent action.

---

## 2. Tech Stack
* **Frontend:** React Native (via Expo)
    * Language: TypeScript
    * Styling: Standard React Native Styles / NativeWind (Optional)
* **Backend:** Django (Python)
    * API: Django REST Framework (DRF)
    * Admin: Django Admin Panel (for content management)
* **Database:** SQLite (Development) / PostgreSQL (Production)
* **Tools:** PyCharm, Expo Go (Testing)

---

## 3. Features & Roadmap

### Phase 1: The Foundation (MVP) - *Current Status*
* [x] **Project Setup:** Initialize Django (Backend) and Expo (Frontend).
* [x] **Backend Logic:** Create `DailyNugget` model (Date, Quote, Explanation, Challenge).
* [x] **API Layer:** Build REST API endpoint (`/api/today/`) to serve the daily content.
* [ ] **Frontend UI:** Create the "Daily Card" display on mobile.
* [ ] **Connection:** Successfully fetch data from local Django server to mobile phone.

### Phase 2: User Interaction
* [ ] **Morning Briefing:** Display the Quote, Theory, and Actionable Task.
* [ ] **Streak System:** Logic to track consecutive days of app usage ("Chain of Iron").
* [ ] **Local Storage:** Save user progress/streaks on the device (AsyncStorage).

### Phase 3: Advanced Features (Future)
* [ ] **Evening Reflection:** A simple journaling prompt based on the morning's challenge.
* [ ] **Memento Mori Clock:** Visual countdown of estimated remaining life weeks.
* [ ] **The Library:** Curated biographies of "Great Men."
* [ ] **Push Notifications:** Daily reminders at 6:00 AM.

---

## 4. Data Structure (The "Daily Nugget")
Every day, the user receives one packet of content containing:
1.  **Date:** Specific date for the content.
2.  **Stoic Quote:** The raw maxim (e.g., Marcus Aurelius).
3.  **Author:** Who said it.
4.  **Decoding:** A modern explanation of what it means.
5.  **Daily Challenge:** A concrete, actionable task (e.g., "Take a cold shower").

---

## 5. Development Notes & Commands
* **Run Backend:** `python manage.py runserver 0.0.0.0:8000` (Inside `backend` folder)
* **Run Frontend:** `npx expo start` (Inside `frontend` folder)
* **Make Migrations:** `python manage.py makemigrations`
* **Apply Migrations:** `python manage.py migrate`