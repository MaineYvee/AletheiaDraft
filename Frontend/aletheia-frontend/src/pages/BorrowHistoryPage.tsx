import { useEffect, useState } from "react";
import { getBorrowHistory } from "../services/borrowService";
import type { BorrowHistory } from "../types/BorrowHistory";

function BorrowHistoryPage() {
    const [history, setHistory] = useState<BorrowHistory[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getBorrowHistory();
                setHistory(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchHistory();
    }, []);

    return (
        <div className="
            min-h-screen
            bg-gradient-to-b
            from-[#0b0f14]
            via-[#111827]
            to-[#05070a]
            text-white
            p-10
        ">

            {/* 🏛️ Header */}
            <h1 className="
                text-4xl font-bold mb-10
                text-transparent bg-clip-text
                bg-gradient-to-r from-amber-300 to-amber-600
            ">
                Borrow History Archive
            </h1>

            {/* 📜 Records */}
            <div className="space-y-4">

                {history.length === 0 && (
                    <p className="text-slate-500">
                        No history records found.
                    </p>
                )}

                {history.map((record) => (
                    <div key={record.borrowId} className="history-card">

                        {/* 📚 Title */}
                        <h2 className="title">
                            {record.bookTitle}
                        </h2>

                        {/* 📅 Dates */}
                        <div className="meta">
                            <p>Borrowed: {record.borrowDate}</p>
                            <p>Due: {record.dueDate}</p>
                            <p>
                                Returned:{" "}
                                {record.returnedDate ?? "Not Returned"}
                            </p>
                        </div>

                        {/* 📌 Status */}
                        <span className={`status ${record.status?.toLowerCase()}`}>
                            {record.status}
                        </span>

                    </div>
                ))}

            </div>

            {/* 🎨 Styles */}
            <style>{`
                .history-card {
                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(251,191,36,0.12);
                    border-radius: 18px;
                    padding: 18px 20px;
                    backdrop-filter: blur(10px);
                    transition: 0.25s ease;
                }

                .history-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(251,191,36,0.25);
                    box-shadow: 0 0 30px rgba(251,191,36,0.08);
                }

                .title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fbbf24;
                    margin-bottom: 10px;
                }

                .meta {
                    font-size: 13px;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 12px;
                }

                .status {
                    display: inline-block;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    border: 1px solid;
                }

                /* 🎀 Soft status colors (pink-based system) */
                .returned {
                    color: #ec4899;
                    border-color: rgba(236,72,153,0.3);
                    background: rgba(236,72,153,0.08);
                }

                .borrowed {
                    color: #fbbf24;
                    border-color: rgba(251,191,36,0.3);
                    background: rgba(251,191,36,0.08);
                }

                .overdue {
                    color: #f472b6;
                    border-color: rgba(244,114,182,0.3);
                    background: rgba(244,114,182,0.08);
                }
            `}</style>

        </div>
    );
}

export default BorrowHistoryPage;