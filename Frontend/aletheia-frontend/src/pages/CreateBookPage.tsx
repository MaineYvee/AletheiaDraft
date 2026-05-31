import { useState } from "react";
import { createBook } from "../services/adminService";
import { useNavigate } from "react-router-dom";

function CreateBookPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [totalCopies, setTotalCopies] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createBook({
                title,
                author,
                isbn,
                category,
                description,
                totalCopies
            });

            alert("Book created successfully");
            navigate("/admin/books");
        } catch (error) {
            console.error(error);
            alert("Failed to create book");
        }
    };

    return (
        <div className="vault">

            {/* 🌌 ambient glow */}
            <div className="glow glow1" />
            <div className="glow glow2" />

            {/* 🏛️ Header */}
            <div className="header">
                <h1>Book Registration Console</h1>
                <p>Insert a new record into the Aletheia Library System</p>
            </div>

            {/* 📚 Form */}
            <form onSubmit={handleSubmit} className="card">

                <div className="grid">

                    <input placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea"
                    />

                    <input
                        type="number"
                        value={totalCopies}
                        onChange={(e) => setTotalCopies(Number(e.target.value))}
                    />

                </div>

                <button className="btn">
                    Register Book
                </button>

            </form>

            {/* 🎨 Styles */}
            <style>{`
                .vault {
                    width: 100%;
                    min-height: 100vh;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    position: relative;
                    color: white;

                    padding: 40px 20px;
                    }overflow: hidden;
                }

                /* 🌟 glow effects */
                .glow {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.18;
                    animation: float 8s infinite ease-in-out;
                }

                .glow1 {
                    background: #fbbf24;
                    top: -120px;
                    left: -120px;
                }

                .glow2 {
                    background: #3b82f6;
                    bottom: -150px;
                    right: -150px;
                }

                @keyframes float {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(30px); }
                }

                .header {
                    margin-bottom: 20px;
                }

                .header h1 {
                    font-size: 34px;
                    font-weight: bold;
                    color: #fbbf24;
                }

                .header p {
                    font-size: 13px;
                    color: #94a3b8;
                }

                /* 📚 form card */
                .card {
                    max-width: 800px;
                    padding: 28px;
                    border-radius: 18px;

                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(251,191,36,0.15);
                    backdrop-filter: blur(12px);

                    box-shadow: 0 0 40px rgba(251,191,36,0.06);
                }

                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                input, textarea {
                    padding: 10px;
                    border-radius: 10px;

                    background: #0f172a;
                    border: 1px solid rgba(148,163,184,0.2);
                    color: white;

                    outline: none;
                    transition: 0.2s;
                }

                input:focus, textarea:focus {
                    border-color: rgba(251,191,36,0.5);
                    box-shadow: 0 0 12px rgba(251,191,36,0.15);
                    transform: scale(1.01);
                }

                .textarea {
                    grid-column: span 2;
                    min-height: 100px;
                    resize: vertical;
                }

                .btn {
                    margin-top: 16px;
                    width: 100%;
                    padding: 12px;

                    border-radius: 12px;
                    font-weight: 600;
                    color: black;

                    background: linear-gradient(to right, #fbbf24, #f59e0b);

                    transition: 0.2s;
                }

                .btn:hover {
                    transform: scale(1.02);
                    box-shadow: 0 0 20px rgba(251,191,36,0.25);
                }
            `}</style>

        </div>
    );
}

export default CreateBookPage;