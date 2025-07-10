# Student Information Management System

A modern, full-stack Student Information Management System built with Next.js, TypeScript and Tailwind CSS. This application provides a clean, responsive dashboard for managing student records, with authentication and protected routes.

---

## Features

- **Authentication & Protected Routes:** Secure login with NextAuth.js (credentials provider). All dashboard and student management routes are protected by middleware.
- **Dashboard Metrics:** Modern dashboard with summary cards for class GPA, majors, and student groupings (high/mid/low GPA).
- **Student CRUD:** Add, edit, view, and delete students with a single, reusable form component and confirmation modals for destructive actions.
- **Filtering & Search:** Instantly filter students by major and search by name. Table updates live, while dashboard metrics always show global stats.
- **Responsive UI:** Built with Tailwind CSS for a mobile-friendly experience.
- **Modal Confirmations:** Deleting a student uses a custom modal with loading feedback.
- **File-based Storage:** Student data is persisted in a local JSON file for realistic backend simulation.
- **SSR/SSG:** Uses server-side rendering for fast, up-to-date data on all main pages.

---

## Tech Stack

- **Framework:** Next.js (App Router, SSR/SSG)
- **Language:** TypeScript
- **Styling:** Tailwind CSS,
- **Authentication:** NextAuth.js (credentials)
- **Data Storage:** Local JSON file (simulated backend)

---

## Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   ```

   **Note:** Replace `your-secret-key-here` with a secure random string. You can generate one using:

   ```bash
   openssl rand -base64 32
   ```

3. **Run the development server:**

   ```bash
   yarn dev

   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## API Endpoints

- `GET    /api/students` – Fetch all students
- `POST   /api/students` – Add a new student
- `GET    /api/students/[id]` – Fetch a single student's details
- `PUT    /api/students/[id]` – Update a student's details
- `DELETE /api/students/[id]` – Delete a student

---

## Authentication

- **Login:** `/login` (username: `admin`, password: `Password@12`)
- **Protected Routes:** All dashboard and student management pages require authentication. Middleware enforces this for `/`, `/dashboard`, and `/students` routes.

---

## Notes

This project demonstrates:

- Modern Next.js app structure (route groups, layouts, SSR, API routes)
- Secure, user-friendly CRUD operations with feedback and validation
- Clear code organization and best practices

For questions or feedback, please free to send me an email eseosaidahosa1@gmail.com
