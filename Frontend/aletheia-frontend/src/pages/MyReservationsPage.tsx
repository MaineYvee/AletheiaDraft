import { useEffect, useState } from "react";
import { getReservations, cancelReservation } from "../services/reservationService";
import type { Reservation } from "../types/Reservation";

function MyReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            setReservations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchReservations();
    }, []);

    const handleCancel = async (reservationId: number) => {
        try {
            await cancelReservation(reservationId);
            alert("Reservation cancelled");
            await fetchReservations();
        } catch (error) {
            console.error(error);
            alert("Failed to cancel reservation");
        }
    };

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
                Reservation Queue Archive
            </h1>

            {/* 📚 List */}
            <div className="space-y-4">

                {reservations.length === 0 && (
                    <p className="text-slate-500">
                        No reservations found.
                    </p>
                )}

                {reservations.map((reservation) => {
                    const isCancelled =
                        reservation.status?.toUpperCase() === "CANCELLED";

                    return (
                        <div
                            key={reservation.reservationId}
                            className={`reservation-card ${isCancelled ? "cancelled" : ""}`}
                        >

                            {/* 📖 Title */}
                            <h2 className="title">
                                {reservation.bookTitle}
                            </h2>

                            {/* ✍️ Author */}
                            <p className="meta">
                                Author: {reservation.author}
                            </p>

                            {/* 📌 Queue Info */}
                            <p className="queue">
                                Queue Position:{" "}
                                <span>{reservation.queuePosition}</span>
                            </p>

                            {/* 📌 Status */}
                            <span className={`status ${isCancelled ? "cancelled-badge" : "active-badge"}`}>
                                {reservation.status}
                            </span>

                            {/* ⚡ Actions */}
                            {!isCancelled ? (
                                <button
                                    onClick={() => handleCancel(reservation.reservationId)}
                                    className="cancel-btn"
                                >
                                    Cancel Reservation
                                </button>
                            ) : (
                                <p className="cancelled-text">
                                    Reservation Cancelled
                                </p>
                            )}

                        </div>
                    );
                })}

            </div>

            {/* 🎨 Styles */}
            <style>{`
                .reservation-card {
                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(251,191,36,0.12);
                    border-radius: 18px;
                    padding: 18px 20px;
                    backdrop-filter: blur(10px);
                    transition: 0.25s ease;
                }

                .reservation-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(251,191,36,0.25);
                    box-shadow: 0 0 30px rgba(251,191,36,0.08);
                }

                .title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fbbf24;
                    margin-bottom: 6px;
                }

                .meta {
                    font-size: 13px;
                    color: #94a3b8;
                    margin-bottom: 6px;
                }

                .queue {
                    font-size: 13px;
                    color: #cbd5e1;
                    margin-bottom: 10px;
                }

                .queue span {
                    color: #fbbf24;
                    font-weight: bold;
                }

                .status {
                    display: inline-block;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    border: 1px solid;
                    margin-bottom: 10px;
                }

                .active-badge {
                    color: #fbbf24;
                    border-color: rgba(251,191,36,0.3);
                    background: rgba(251,191,36,0.08);
                }

                .cancelled-badge {
                    color: #ec4899;
                    border-color: rgba(236,72,153,0.3);
                    background: rgba(236,72,153,0.08);
                }

                .cancel-btn {
                margin-top: 8px;
                margin-left: 25px;
                padding: 6px 10px;
                border-radius: 8px;

                background: linear-gradient(to right, #ec4899, #db2777);
                color: white;

                font-size: 12px;
                font-weight: 500;

                transition: 0.2s ease;
                display: inline-block;
                }

                .cancel-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 18px rgba(236,72,153,0.25);
                }

                .cancelled-text {
                    color: #f472b6;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .cancelled {
                    opacity: 0.75;
                }
            `}</style>

        </div>
    );
}

export default MyReservationsPage;