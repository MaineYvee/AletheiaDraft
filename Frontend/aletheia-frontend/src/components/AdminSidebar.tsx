import { Link } from "react-router-dom";

function AdminSidebar() {
    return (
        <div className="sidebar">

            <h1 className="title">Admin Panel</h1>

            {/* 🧭 Admin Section */}
            <p className="section">ADMIN FEATURES</p>

            <nav className="nav">

                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/books">Books</Link>
                <Link to="/admin/books/create">Register Book</Link>
                <Link to="/admin/audit-logs">Audit Logs</Link>
                <Link to="/admin/users">Manage Users</Link>

            </nav>

            {/* 🧭 Student Section */}
            <p className="section">STUDENT FEATURES</p>

            <nav className="nav">

                <Link to="/profile">My Profile</Link>
                <Link to="/borrowed">Borrowed Books</Link>
                <Link to="/history">Borrow History</Link>
                <Link to="/reservations">Reservations</Link>

            </nav>

            {/* 🚪 Logout */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="logout"
            >
                Logout
            </button>

            {/* 🎨 Styles */}
            <style>{`
                .sidebar {
                    width: 260px;
                    min-height: 100vh;
                    background: linear-gradient(to bottom, #0b0f14, #05070a);
                    padding: 24px;
                    color: white;
                    border-right: 1px solid rgba(251,191,36,0.1);
                }

                .title {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #fbbf24;
                    letter-spacing: 1px;
                }

                .section {
                    font-size: 11px;
                    color: #94a3b8;
                    margin-top: 18px;
                    margin-bottom: 8px;
                    letter-spacing: 2px;
                }

                .nav {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .nav a {
                    padding: 8px 10px;
                    border-radius: 8px;
                    color: #cbd5e1;
                    font-size: 14px;
                    transition: 0.2s;
                    border: 1px solid transparent;
                }

                .nav a:hover {
                    background: rgba(251,191,36,0.08);
                    color: #fbbf24;
                    border-color: rgba(251,191,36,0.2);
                    transform: translateX(3px);
                }

                .logout {
                    margin-top: 30px;
                    width: 100%;
                    padding: 10px;
                    border-radius: 10px;

                    background: linear-gradient(to right, #ec4899, #db2777);
                    color: white;
                    font-weight: 600;

                    transition: 0.2s;
                }

                .logout:hover {
                    transform: scale(1.03);
                    box-shadow: 0 0 18px rgba(236,72,153,0.25);
                }
            `}</style>

        </div>
    );
}

export default AdminSidebar;