import {
    useEffect,
    useState
} from "react";

import {
    getBooks
} from "../services/bookService";

import type {
    Book
} from "../types/Book";

function InventoryPage() {

    const [books,
        setBooks] =
        useState<Book[]>([]);

    useEffect(() => {

        const loadBooks =
            async () => {

                const data =
                    await getBooks();

                setBooks(
                    data.data
                );
            };

        void loadBooks();

    }, []);

    return (

        <div className="p-8">

            <h1
                className="
                    text-3xl
                    font-bold
                    mb-8
                "
            >
                Inventory Management
            </h1>

            <table
                className="
                    w-full
                    bg-slate-800
                    rounded-xl
                "
            >

                <thead>

                <tr>

                    <th>Title</th>
                    <th>Total</th>
                    <th>Available</th>

                </tr>

                </thead>

                <tbody>

                {books.map((book) => (

                    <tr
                        key={book.id}
                    >

                        <td>
                            {book.title}
                        </td>

                        <td>
                            {book.totalCopies}
                        </td>

                        <td>
                            {book.availableCopies}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default InventoryPage;