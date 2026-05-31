import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookService";
import { archiveBook } from "../services/adminService";
import type { Book } from "../types/Book";

function AdminBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        void loadBooks();
    }, []);

    const handleArchive = async (id: number) => {
        try {
            await archiveBook(id);
            setBooks(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // 🔍 FILTERING LOGIC
    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch =
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author?.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                category === "ALL" || book.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [books, search, category]);

    // 📊 PAGINATION LOGIC
    const totalPages = Math.ceil(filteredBooks.length / pageSize);

    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredBooks.slice(start, start + pageSize);
    }, [filteredBooks, currentPage]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="page">

            <h1 className="title">Manage Books Ledger</h1>

            {/* 🔍 SEARCH + FILTER */}
            <div className="controls">

                <input
                    type="text"
                    placeholder="Search title or author..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="input"
                />

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="select"
                >
                    <option value="ALL">All Categories</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Self Help">Self Help</option>
                </select>

            </div>

            {/* 📚 LIST */}
            <div className="list">
                {paginatedBooks.map(book => (
                    <div key={book.id} className="card">

                        <div>
                            <h2 className="book-title">{book.title}</h2>
                            <p className="meta">
                                {book.author} • {book.category}
                            </p>
                        </div>

                        <div className="actions">

                            <button
                                onClick={() => handleArchive(book.id)}
                                className="archive-btn"
                            >
                                Archive
                            </button>

                            <Link
                                to={`/admin/books/edit/${book.id}`}
                                className="edit-btn"
                            >
                                Edit
                            </Link>

                        </div>

                    </div>
                ))}
            </div>

            {/* 📊 PAGINATION */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`page-btn ${currentPage === page ? "active" : ""}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* 🎨 STYLES */}
            <style>{`
                .page {
                    padding: 32px;
                    color: white;
                }

                .title {
                    font-size: 32px;
                    font-weight: bold;
                    margin-bottom: 18px;
                    color: #fbbf24;
                }

                /* 🔍 controls */
                .controls {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 16px;
                }

                .input, .select {
                    padding: 10px;
                    border-radius: 8px;
                    background: #0f172a;
                    border: 1px solid rgba(148,163,184,0.2);
                    color: white;
                    outline: none;
                }

                /* 📚 list */
                .list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .card {
                    background: rgba(15, 23, 42, 0.85);
                    border-radius: 12px;
                    padding: 14px;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    transition: 0.2s;
                }

                .card:hover {
                    transform: translateY(-2px);
                    border: 1px solid rgba(251,191,36,0.25);
                    box-shadow: 0 0 18px rgba(251,191,36,0.08);
                }

                .book-title {
                    font-size: 16px;
                    font-weight: 600;
                }

                .meta {
                    font-size: 12px;
                    color: #94a3b8;
                }

                .actions {
                    display: flex;
                    gap: 8px;
                }

                .archive-btn {
                    background: linear-gradient(to right, #a855f7, #7c3aed);
                    padding: 6px 10px;
                    border-radius: 8px;
                    font-size: 12px;
                    color: white;
                }

                .edit-btn {
                    background: linear-gradient(to right, #3b82f6, #2563eb);
                    padding: 6px 10px;
                    border-radius: 8px;
                    font-size: 12px;
                    color: white;
                }

                /* 📊 pagination */
                .pagination {
                    margin-top: 18px;
                    display: flex;
                    gap: 6px;
                }

                .page-btn {
                    padding: 6px 10px;
                    border-radius: 6px;
                    background: #0f172a;
                    border: 1px solid rgba(148,163,184,0.2);
                    color: white;
                    cursor: pointer;
                }

                .page-btn.active {
                    background: #fbbf24;
                    color: black;
                    font-weight: bold;
                }
            `}</style>

        </div>
    );
}

export default AdminBooksPage;