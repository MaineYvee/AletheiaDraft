function DashboardCard({ title, value }) {
    return (
        <div className="dashboard-card">
            <h3>{title}</h3>
            <p>{value}</p>

            <style>{`
                .dashboard-card {
                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(148, 163, 184, 0.15);
                    padding: 18px;
                    border-radius: 16px;
                    transition: 0.25s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .dashboard-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(251, 191, 36, 0.4);
                    box-shadow:
                        0 0 20px rgba(251, 191, 36, 0.15),
                        0 0 40px rgba(56, 189, 248, 0.08);
                }

                .dashboard-card h3 {
                    font-size: 14px;
                    color: #94a3b8;
                }

                .dashboard-card p {
                    font-size: 26px;
                    font-weight: bold;
                    color: #fbbf24;
                }
            `}</style>
        </div>
    );
}

export default DashboardCard;