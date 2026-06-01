# Frontend / aletheia-frontend

## Overview

This folder contains the React + TypeScript frontend for Aletheia. It is built with Vite and provides the user interface, client-side routing, service abstraction, and reusable UI components for interacting with the backend.

## How the frontend works

The frontend is organized around pages, reusable components, and services.

1. `src/App.tsx` defines the route structure.
2. Protected routes are enforced via `src/routes/ProtectedRoute.tsx`.
3. Pages in `src/pages` call functions from `src/services`.
4. Those service functions send HTTP requests through `src/api/axios.ts`.
5. Data returned from the API is typed with interfaces in `src/types` and rendered by page components.

## Folder structure and responsibilities

### `src/api`
- `axios.ts` creates a shared Axios instance with `baseURL` and automatically adds JWT tokens from `localStorage`.
- This central client keeps API configuration in one place.

### `src/services`
- Each service file focuses on one backend domain.
- `authService.ts`: login and registration.
- `bookService.ts`: book listing and detail fetches.
- `borrowService.ts`, `reservationService.ts`, `profileService.ts`, `dashboardService.ts`, `adminService.ts`, `userService.ts`, `fileService.ts`: each wraps backend endpoints for the related feature.
- Services separate network calls from UI components.

### `src/pages`
- Pages represent screens and contain UI logic.
- Examples:
  - `LoginPage`, `RegisterPage`, `HomePage`
  - `DashboardPage`, `ProfilePage`, `BorrowHistoryPage`, `MyBorrowedBooksPage`, `MyReservationsPage`
  - `BooksPage`, `BookDetailsPage`, `CreateBookPage`, `EditBookPage`
  - Admin pages like `AdminDashboardPage`, `AdminBooksPage`, `AuditLogsPage`, `UserManagementPage`
- Pages call service methods, manage local state, and render components.

### `src/components`
- Reusable UI building blocks.
- `BookForm.tsx` is shared by book create/edit flows.
- `Sidebar.tsx` and `AdminSidebar.tsx` provide consistent navigation.
- `DashboardCard.tsx` renders metric summaries.

### `src/layouts`
- `DashboardLayout.tsx` wraps dashboard-related pages with shared layout and navigation.

### `src/routes`
- `ProtectedRoute.tsx` redirects unauthenticated users to `/login`.
- It enforces token-based access for protected pages.

### `src/types`
- TypeScript interfaces ensure the app handles backend data consistently.
- Types include `Book`, `User`, `Profile`, `Reservation`, `BorrowedBook`, `BorrowHistory`, and `AuditLog`.

### `src/context` and `src/hooks`
- These folders are currently empty and reserved for later state management or custom hooks.
- The current design uses local state in individual pages and service calls.

## Key connections

### Route and page connections
- `App.tsx` determines which page renders for each path.
- Protected pages such as `/dashboard`, `/profile`, and admin routes are wrapped in `ProtectedRoute`.
- Pages are composed from components and layouts to keep UI code modular.

### Service and API connections
- Page components call service functions like `login()`, `getBooks()`, `getBookById()`, and `getProfile()`.
- Service functions use the shared Axios client from `src/api/axios.ts`.
- The Axios client adds `Authorization: Bearer <token>` automatically when a token is present.

### Component reuse
- `BookForm` is used by both `CreateBookPage` and `EditBookPage`.
- `Sidebar` and `AdminSidebar` are used across user and admin dashboards.
- `DashboardCard` is used to display numerical summaries consistently.

## Running the frontend

From `Frontend/aletheia-frontend`:

```bash
npm install
npm run dev
```

The frontend application runs locally via Vite and connects to the backend API at `http://localhost:8080/api`.
