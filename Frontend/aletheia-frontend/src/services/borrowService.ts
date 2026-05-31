import apiClient from "../api/axios";

export const borrowBook = async (
    bookId: number
) => {

    const response =
        await apiClient.post(
            `/borrow/${bookId}`
        );

    return response.data;
};

export const returnBook =
    async (borrowId: number) => {

        const response =
            await apiClient.post(
                `/borrow/return/${borrowId}`
            );

        return response.data;
    };

export const getBorrowedBooks =
    async () => {

        const response =
            await apiClient.get(
                "/borrow/my-books"
            );

        return response.data;
    };

export const getBorrowHistory =
    async () => {

        const response =
            await apiClient.get(
                "/borrow/history"
            );

        return response.data;
    };

export const getOverdueBooks =
    async () => {

        const response =
            await apiClient.get(
                "/borrow/overdue"
            );

        return response.data;
    };