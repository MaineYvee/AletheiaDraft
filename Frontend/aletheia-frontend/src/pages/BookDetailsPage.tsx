import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import type { Book } from "../types/Book";
import { borrowBook } from "../services/borrowService";
import { reserveBook } from "../services/reservationService";

function BookDetailsPage() {
    const { id } = useParams();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;

            try {
                const response = await getBookById(Number(id));
                setBook(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchBook();
    }, [id]);

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b0f14] text-slate-400">
                Loading archive record...
            </div>
        );
    }

    const handleBorrow = async () => {
        try {
            await borrowBook(book.id);
            alert("Book borrowed successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to borrow book");
        }
    };

    const handleReserve = async () => {
        try {
            await reserveBook(book.id);
            alert("Book reserved successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to reserve book");
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
            flex
            items-center
            justify-center
            p-10
        ">

            {/* 📖 Main Archive Card */}
            <div className="book-detail-card">

                {/* 📘 Cover */}
                {book.coverImageUrl && (
                    <img
                        src={`http://localhost:8080${book.coverImageUrl}`}
                        alt={book.title}
                        className="book-cover"
                    />
                )}

                {/* 🏛️ Title */}
                <h1 className="title">
                    {book.title}
                </h1>

                {/* 📌 Meta Info */}
                <div className="meta">
                    <p><span>Author:</span> {book.author}</p>
                    <p><span>ISBN:</span> {book.isbn}</p>
                    <p><span>Category:</span> {book.category}</p>
                    <p>
                        <span>Copies:</span>{" "}
                        {book.availableCopies} / {book.totalCopies}
                    </p>
                </div>

                {/* 📌 Description */}
                <p className="description">
                    {book.description}
                </p>

                {/* ⚡ Actions */}
                <div className="actions">

                    {book.available ? (
                        <button onClick={handleBorrow} className="borrow">
                            Borrow Archive
                        </button>
                    ) : (
                        <button onClick={handleReserve} className="reserve">
                            Reserve Record
                        </button>
                    )}

                </div>

            </div>

            {/* 🎨 Styles */}
            <style>{`
                .book-detail-card {
                    width: 100%;
                    max-width: 650px;
                    background: rgba(15, 23, 42, 0.7);
                    border: 1px solid rgba(251,191,36,0.15);
                    border-radius: 22px;
                    padding: 28px;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 0 40px rgba(251,191,36,0.08);
                    text-align: center;
                }

                .book-cover {
                    width: 180px;
                    height: 260px;
                    object-fit: cover;
                    border-radius: 14px;
                    margin: 0 auto 20px auto;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                }

                .title {
                    font-size: 32px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #fbbf24;
                }

                .meta {
                    text-align: left;
                    margin-bottom: 18px;
                    color: #cbd5e1;
                    font-size: 14px;
                    line-height: 1.8;
                }

                .meta span {
                    color: #fbbf24;
                    font-weight: 600;
                }

                .description {
                    color: #94a3b8;
                    font-size: 14px;
                    margin-top: 10px;
                    margin-bottom: 24px;
                    line-height: 1.6;
                }

                .actions {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }

                .borrow {
                    padding: 12px 18px;
                    border-radius: 12px;
                    background: linear-gradient(to right, #22c55e, #16a34a);
                    color: black;
                    font-weight: bold;
                    transition: 0.2s;
                }

                .borrow:hover {
                    transform: scale(1.05);
                }

                .reserve {
                    padding: 12px 18px;
                    border-radius: 12px;
                    background: linear-gradient(to right, #fbbf24, #f59e0b);
                    color: black;
                    font-weight: bold;
                    transition: 0.2s;
                }

                .reserve:hover {
                    transform: scale(1.05);
                }
            `}</style>

        </div>
    );
}

export default BookDetailsPage;