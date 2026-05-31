import {
    useEffect,
    useState
} from "react";

import {
    getOverdueBooks
} from "../services/borrowService";

function OverduePage() {

    const [books,
        setBooks] =
        useState([]);

    useEffect(() => {

        const loadData =
            async () => {

                const data =
                    await getOverdueBooks();

                setBooks(
                    data.data
                );
            };

        void loadData();

    }, []);

    return (

        <div className="p-8">

            <h1
                className="
                    text-3xl
                    mb-6
                "
            >
                Overdue Books
            </h1>

            {books.map((book: any) => (

                <div
                    key={book.borrowId}
                    className="
                        p-4
                        bg-red-900
                        rounded-lg
                        mb-2
                    "
                >

                    {book.bookTitle}

                </div>

            ))}

        </div>
    );
}

export default OverduePage;