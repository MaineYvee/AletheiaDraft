import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import { uploadBookCover } from "../services/fileService";

function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 📦 original data (for diffing)
    const [original, setOriginal] = useState<any>(null);

    // ✏️ form state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [totalCopies, setTotalCopies] = useState(1);
    const [cover, setCover] = useState<File | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            if (!id) return;

            const data = await getBookById(Number(id));
            const book = data.data;

            setOriginal(book);

            setTitle(book.title);
            setAuthor(book.author);
            setIsbn(book.isbn);
            setCategory(book.category);
            setDescription(book.description);
            setTotalCopies(book.totalCopies);
        };

        void loadBook();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        try {
            await updateBook(Number(id), {
                title,
                author,
                isbn,
                category,
                description,
                totalCopies
            });

            if (cover) {
                await uploadBookCover(Number(id), cover);
            }

            alert("Book updated");
            navigate("/admin/books");
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    const changed = (field: string, value: any) => {
        if (!original) return false;
        return original[field] !== value;
    };

    return (
        <div className="vault">

            <div className="glow glow1" />
            <div className="glow glow2" />

            <div className="header">
                <h1>Edit Archive Entry</h1>
                <p>Changes are tracked in real-time</p>
            </div>

            <div className="layout">

                {/* 📚 FORM */}
                <form onSubmit={handleSubmit} className="card">

                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setCover(e.target.files[0]);
                            }
                        }}
                    />

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={changed("title", title) ? "changed" : ""}
                        placeholder="Title"
                    />

                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={changed("author", author) ? "changed" : ""}
                        placeholder="Author"
                    />

                    <input
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className={changed("isbn", isbn) ? "changed" : ""}
                        placeholder="ISBN"
                    />

                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={changed("category", category) ? "changed" : ""}
                        placeholder="Category"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={changed("description", description) ? "changed" : ""}
                        placeholder="Description"
                    />

                    <input
                        type="number"
                        value={totalCopies}
                        onChange={(e) => setTotalCopies(Number(e.target.value))}
                        className={changed("totalCopies", totalCopies) ? "changed" : ""}
                    />

                    <button className="btn">Save Changes</button>
                </form>

                {/* 📊 DIFF PANEL */}
                <div className="diff">

                    <h2>Change Preview</h2>

                    {original && (
                        <div className="diffBox">

                            <Diff label="Title" oldV={original.title} newV={title} />
                            <Diff label="Author" oldV={original.author} newV={author} />
                            <Diff label="ISBN" oldV={original.isbn} newV={isbn} />
                            <Diff label="Category" oldV={original.category} newV={category} />
                            <Diff label="Copies" oldV={original.totalCopies} newV={totalCopies} />

                        </div>
                    )}

                </div>
            </div>

            {/* 🎨 STYLES */}
            <style>{`
                .header {
                    margin-bottom: 25px;
                }
                .vault {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #05070a;
                    color: white;
                    position: relative;
                    padding: 40px;
                }

                .layout {
                    display: flex;
                    gap: 20px;
                    width: 100%;
                    max-width: 1100px;
                    align-items: flex-start;
                }

                .card {
                    flex: 1;
                    padding: 20px;
                    background: rgba(15,23,42,0.75);
                    border-radius: 16px;
                    border: 1px solid rgba(251,191,36,0.15);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .diff {
                    width: 320px;
                    padding: 16px;
                    background: rgba(2,6,23,0.9);
                    border-radius: 16px;
                    border: 1px solid rgba(148,163,184,0.2);
                }

                .diffBox {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    font-size: 13px;
                }

                .row {
                    padding: 8px;
                    border-radius: 8px;
                    background: #0f172a;
                }

                .changed {
                    border: 1px solid #fbbf24 !important;
                    background: rgba(251,191,36,0.08);
                }

                input, textarea {
                    padding: 10px;
                    border-radius: 10px;
                    background: #0f172a;
                    border: 1px solid rgba(148,163,184,0.2);
                    color: white;
                }

                .btn {
                    margin-top: 10px;
                    background: #22c55e;
                    padding: 10px;
                    border-radius: 10px;
                    font-weight: bold;
                }

                .diff h2 {
                    color: #fbbf24;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
}

/* 📊 Diff Component */
function Diff({ label, oldV, newV }: any) {
    const changed = oldV !== newV;

    return (
        <div className={`row ${changed ? "changed" : ""}`}>
            <strong>{label}</strong>
            <div>Before: {String(oldV)}</div>
            <div>After: {String(newV)}</div>
        </div>
    );
}

export default EditBookPage;