import { Routes, Route } from "react-router-dom";

import HomePage
    from "./pages/HomePage";

import RegisterPage
    from "./pages/RegisterPage";

import LoginPage from "./pages/LoginPage";

import DashboardPage
    from "./pages/DashboardPage";

import ProtectedRoute
    from "./routes/ProtectedRoute";

import BorrowHistoryPage
    from "./pages/BorrowHistoryPage";

import MyReservationsPage
    from "./pages/MyReservationsPage";

import MyBorrowedBooksPage
    from "./pages/MyBorrowedBooksPage";

import BooksPage from "./pages/BooksPage";

import BookDetailsPage from "./pages/BookDetailsPage";

import AdminDashboardPage
    from "./pages/AdminDashboardPage";

import AdminBooksPage
    from "./pages/AdminBooksPage";

import CreateBookPage
    from "./pages/CreateBookPage";

import EditBookPage
    from "./pages/EditBookPage";

import AuditLogsPage
    from "./pages/AuditLogsPage";
import UserManagementPage from "./pages/UserManagementPage.tsx";

import ProfilePage
    from "./pages/ProfilePage";

import ChangePasswordPage
    from "./pages/ChangePasswordPage";

function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
            path="/login"
            element={<LoginPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <DashboardPage />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/change-password"
                element={
                    <ProtectedRoute>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/borrowed"
                element={
                    <ProtectedRoute>
                        <MyBorrowedBooksPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <BorrowHistoryPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reservations"
                element={
                    <ProtectedRoute>
                        <MyReservationsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/books"
                element={<BooksPage />}
            />

            <Route
                path="/books/:id"
                element={<BookDetailsPage />}
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books"
                element={
                    <ProtectedRoute>
                        <AdminBooksPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books/create"
                element={
                    <ProtectedRoute>
                        <CreateBookPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditBookPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/audit-logs"
                element={
                    <ProtectedRoute>
                        <AuditLogsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <UserManagementPage />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );
}

export default App;