import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import { getBooks } from "../services/bookService";

function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [availability, setAvailability] = useState("ALL");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchBooks();
    }, []);

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "ALL" || book.category === category;

        const matchesAvailability =
            availability === "ALL" ||
            (availability === "AVAILABLE" && book.available) ||
            (availability === "UNAVAILABLE" && !book.available);

        return matchesSearch && matchesCategory && matchesAvailability;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#111827] to-[#05070a] text-white p-10">

            {/* 🏛️ Header */}
            <h1 className="
                text-4xl font-bold mb-8
                text-transparent bg-clip-text
                bg-gradient-to-r from-amber-300 to-amber-600
            ">
                Library Archive
            </h1>

            {/* 🔍 Filters */}
            <div className="flex flex-wrap gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        px-4 py-3 rounded-lg
                        bg-slate-950 border border-slate-700
                        text-white w-full md:w-1/3
                        focus:border-amber-400 outline-none
                    "
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                        px-4 py-3 rounded-lg
                        bg-slate-950 border border-slate-700
                        text-white
                        focus:border-amber-400 outline-none
                    "
                >
                    <option value="ALL">All Categories</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comic">Comic</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Self Help">Self Help</option>
                    <option value="Software Engineering">Software Engineering</option>
                </select>

                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="
                        px-4 py-3 rounded-lg
                        bg-slate-950 border border-slate-700
                        text-white
                        focus:border-amber-400 outline-none
                    "
                >
                    <option value="ALL">All Books</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                </select>

            </div>

            {/* 📚 Book Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                {filteredBooks.map((book) => (
                    <Link key={book.id} to={`/books/${book.id}`}>
                        <div className="book-card">

                            {book.coverImageUrl && (
                                <img
                                    src={`http://localhost:8080${book.coverImageUrl}`}
                                    alt={book.title}
                                    className="book-cover"
                                />
                            )}

                            <h2 className="text-lg font-bold text-amber-200">
                                {book.title}
                            </h2>

                            <p className="text-slate-400 text-sm">
                                {book.author}
                            </p>

                            <p className="text-slate-500 text-xs mt-1">
                                {book.category}
                            </p>

                            <span className={
                                book.available
                                    ? "status available"
                                    : "status unavailable"
                            }>
                                {book.available ? "Available" : "Unavailable"}
                            </span>

                        </div>
                    </Link>
                ))}

            </div>

            {/* 🎨 Styles */}
            <style>{`
                .book-card {
                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(251,191,36,0.12);
                    padding: 16px;
                    border-radius: 18px;
                    transition: 0.25s ease;
                    backdrop-filter: blur(10px);
                }

                .book-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(251,191,36,0.3);
                    box-shadow: 0 0 30px rgba(251,191,36,0.12);
                }

                .book-cover {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 12px;
                }

                .status {
                    display: inline-block;
                    margin-top: 10px;
                    font-size: 12px;
                    padding: 4px 10px;
                    border-radius: 999px;
                    border: 1px solid;
                }

                .available {
                    color: #4ade80;
                    border-color: rgba(74,222,128,0.3);
                    background: rgba(74,222,128,0.08);
                }

                .unavailable {
                    color: #f87171;
                    border-color: rgba(248,113,113,0.3);
                    background: rgba(248,113,113,0.08);
                }
            `}</style>

        </div>
    );
}

export default BooksPage;