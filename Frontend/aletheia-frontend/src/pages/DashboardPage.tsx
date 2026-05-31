import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import type { BorrowedBook } from "../types/BorrowedBook";

function DashboardPage() {
    const [borrowedCount, setBorrowedCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await getDashboardData();

                setBorrowedCount(data.borrowedCount);
                setReservationCount(data.reservationCount);
                setBorrowedBooks(data.borrowedBooks);
            } catch (error) {
                console.error(error);
            }
        };

        void loadDashboard();
    }, []);

    const books = Array.from({ length: 6 });

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#111827] to-[#05070a] text-white">

            <Sidebar />

            {/* 🏛️ Main Content */}
            <div className="flex-1 p-10 relative overflow-hidden">

                {/* 🕯️ Candle glow */}
                <div className="candle-glow"></div>

                {/* Header */}
                <h1 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
                    Student Archive Dashboard
                </h1>

                {/* 📊 STAT CARDS */}
                <div className="grid grid-cols-3 gap-6 mb-10">

                    <StatCard
                        icon="📚"
                        label="Borrowed Books"
                        value={borrowedCount}
                    />

                    <StatCard
                        icon="📖"
                        label="Reservations"
                        value={reservationCount}
                    />

                    <StatCard
                        icon="⏳"
                        label="Overdue"
                        value={0}
                    />

                </div>

                {/* 📚 BOOK LEDGER */}
                <div className="ledger-card">

                    <h2 className="text-2xl font-semibold mb-6 text-amber-300">
                        Recent Borrowed Books
                    </h2>

                    <div className="space-y-3">
                        {borrowedBooks.length === 0 && (
                            <p className="text-slate-500">
                                No borrowed books found.
                            </p>
                        )}

                        {borrowedBooks.map((book) => (
                            <div key={book.borrowId} className="ledger-item">
                                <div className="flex items-center gap-3">
                                    <span className="text-amber-300">📘</span>
                                    <div>
                                        <p className="font-semibold">{book.bookTitle}</p>
                                        <p className="text-xs text-slate-500">
                                            Borrowed record ID: {book.borrowId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* 🎨 Styles */}
                <style>{`
                    /* 🕯️ Candle glow */
                    .candle-glow {
                        position: absolute;
                        top: 10%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(
                            circle,
                            rgba(255,191,0,0.22),
                            rgba(255,191,0,0.06),
                            transparent 70%
                        );
                        filter: blur(30px);
                        animation: flicker 3s infinite ease-in-out;
                        pointer-events: none;
                    }

                    @keyframes flicker {
                        0%,100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }

                    /* 📚 floating books */
                    .floating-book {
                        position: absolute;
                        bottom: -60px;
                        opacity: 0.15;
                        animation: floatUp 14s linear infinite;
                        pointer-events: none;
                    }

                    @keyframes floatUp {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 0;
                        }
                        20% { opacity: 0.25; }
                        100% {
                            transform: translateY(-120vh) rotate(360deg);
                            opacity: 0;
                        }
                    }

                    /* 📊 STAT CARD */
                    .stat-card {
                        background: rgba(15, 23, 42, 0.6);
                        border: 1px solid rgba(251,191,36,0.15);
                        padding: 24px;
                        border-radius: 18px;
                        backdrop-filter: blur(10px);
                        transition: 0.3s;
                        box-shadow: 0 0 25px rgba(251,191,36,0.05);
                    }

                    .stat-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 0 35px rgba(251,191,36,0.15);
                    }

                    .stat-icon {
                        font-size: 26px;
                        margin-bottom: 8px;
                    }

                    .stat-value {
                        font-size: 34px;
                        font-weight: bold;
                        color: #fbbf24;
                    }

                    .stat-label {
                        font-size: 13px;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    /* 📚 ledger */
                    .ledger-card {
                        background: rgba(15, 23, 42, 0.6);
                        border: 1px solid rgba(251,191,36,0.15);
                        padding: 28px;
                        border-radius: 20px;
                        backdrop-filter: blur(10px);
                    }

                    .ledger-item {
                        padding: 14px;
                        border-radius: 12px;
                        border: 1px solid rgba(148,163,184,0.1);
                        transition: 0.2s;
                    }

                    .ledger-item:hover {
                        background: rgba(251,191,36,0.05);
                        transform: translateX(5px);
                    }
                `}</style>

            </div>
        </div>
    );
}

/* 📊 STAT CARD COMPONENT */
function StatCard({ icon, label, value }) {
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default DashboardPage;