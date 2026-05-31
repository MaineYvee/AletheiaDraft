import apiClient from "../api/axios";

export const getBooks = async () => {

    const response =
        await apiClient.get("/books");

    return response.data;
};

export const getBookById = async (
    id: number
) => {

    const response =
        await apiClient.get(
            `/books/${id}`
        );

    return response.data;
};