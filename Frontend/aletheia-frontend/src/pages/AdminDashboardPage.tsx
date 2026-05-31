import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminService";
import DashboardCard from "../components/DashboardCard";

function AdminDashboardPage() {

    const [stats, setStats] = useState({
        totalBooks: 0,
        totalUsers: 0,
        borrowedBooks: 0,
        reservations: 0,
        overdueBooks: 0
    });

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getAdminDashboard();
                setStats(data.data);

            } catch (error) {

                console.error(error);
            }
        };

        void loadDashboard();

    }, []);

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                {/* 🏛️ Header */}
                <div className="header">

                    <h1 className="title">
                        Admin Command Center
                    </h1>

                    <p className="subtitle">
                        Real-time library intelligence overview
                    </p>

                </div>

                {/* 📊 Stats Grid */}
                <div className="grid">

                    <DashboardCard title="Books" value={stats.totalBooks} />
                    <DashboardCard title="Users" value={stats.totalUsers} />
                    <DashboardCard title="Borrowed" value={stats.borrowedBooks} />
                    <DashboardCard title="Reservations" value={stats.reservations} />
                    <DashboardCard title="Overdue" value={stats.overdueBooks} />

                </div>

                {/* 🕯️ Candle (bottom-right corner) */}
                <div className="candle">
                    <div className="flame"></div>
                    <div className="wick"></div>
                    <div className="wax"></div>
                </div>

            </div>

            {/* 🎨 STYLES */}
            <style>{`

                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background:
                        radial-gradient(circle at top, #0b0f14, #05070a 60%);
                    color: white;
                    overflow: hidden;
                }

                .admin-content {
                    flex: 1;
                    padding: 40px;
                    position: relative;
                }

                /* 🏛️ header */
                .header {
                    margin-bottom: 30px;
                }

                .title {
                    font-size: 44px;
                    font-weight: 800;
                    margin-bottom: 6px;

                    background: linear-gradient(90deg, #fbbf24, #38bdf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .subtitle {
                    color: #94a3b8;
                    font-size: 14px;
                }

                /* 📊 GRID */
                .grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 18px;
                }

                @media (max-width: 1100px) {
                    .grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 600px) {
                    .grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* 🕯️ CANDLE */
                .candle {
                    position: absolute;
                    bottom: 25px;
                    right: 25px;
                    width: 30px;
                    height: 90px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* 🔥 flame */
                .flame {
                    width: 14px;
                    height: 20px;
                    background: radial-gradient(circle, #ffd27a, #ff8c00, transparent 70%);
                    border-radius: 50%;
                    animation: flicker 0.12s infinite alternate ease-in-out;
                    box-shadow:
                        0 0 14px rgba(255, 180, 0, 0.7),
                        0 0 28px rgba(255, 140, 0, 0.4);
                }

                @keyframes flicker {
                    0% {
                        transform: scale(1) translateX(-1px);
                        opacity: 0.85;
                    }
                    100% {
                        transform: scale(1.15) translateX(1px);
                        opacity: 1;
                    }
                }

                /* 🪵 wick */
                .wick {
                    width: 2px;
                    height: 10px;
                    background: #1f1f1f;
                    margin-top: -2px;
                }

                /* 🧈 wax */
                .wax {
                    width: 18px;
                    height: 45px;
                    background: linear-gradient(to bottom, #1e293b, #0f172a);
                    border-radius: 6px;
                    margin-top: 2px;
                    box-shadow: inset 0 0 8px rgba(255,255,255,0.04);
                }

            `}</style>

        </div>
    );
}

export default AdminDashboardPage;