import { useEffect, useState } from "react";
import { getBorrowedBooks, returnBook } from "../services/borrowService";
import type { BorrowedBook } from "../types/BorrowedBook";

function MyBorrowedBooksPage() {
    const [books, setBooks] = useState<BorrowedBook[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBorrowedBooks();
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchData();
    }, []);

    const handleReturn = async (borrowId: number) => {
        try {
            await returnBook(borrowId);

            alert("Book returned successfully");

            // refresh properly
            const updated = await getBorrowedBooks();
            setBooks(updated.data);

        } catch (error) {
            console.error(error);
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
                Borrowing Ledger
            </h1>

            {/* 📚 List */}
            <div className="space-y-4">

                {books.length === 0 && (
                    <p className="text-slate-500">
                        No borrowed records found.
                    </p>
                )}

                {books.map((book) => (
                    <div key={book.borrowId} className="borrow-card">

                        {/* 📖 Title */}
                        <div>
                            <h2 className="title">
                                {book.bookTitle}
                            </h2>

                            {/* ⏳ Due date */}
                            <p className="due">
                                Due Date: {book.dueDate}
                            </p>
                        </div>

                        {/* ⚡ Action */}
                        <button
                            onClick={() => handleReturn(book.borrowId)}
                            className="return-btn"
                        >
                            Return Book
                        </button>

                    </div>
                ))}

            </div>

            {/* 🎨 Styles */}
            <style>{`
                .borrow-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    padding: 18px 20px;
                    border-radius: 16px;

                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(251,191,36,0.12);
                    backdrop-filter: blur(10px);

                    transition: 0.25s ease;
                }

                .borrow-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(251,191,36,0.25);
                    box-shadow: 0 0 30px rgba(251,191,36,0.08);
                }

                .title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fbbf24;
                    margin-bottom: 4px;
                }

                .due {
                    font-size: 13px;
                    color: #94a3b8;
                }

                .return-btn {
                padding: 10px 14px;
                border-radius: 10px;

                background: linear-gradient(to right, #ec4899, #db2777);
                color: white;

                font-weight: 600;
                transition: 0.2s;
                }

                .return-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 0 18px rgba(236, 72, 153, 0.25);
                }
            `}</style>

        </div>
    );
}

export default MyBorrowedBooksPage;