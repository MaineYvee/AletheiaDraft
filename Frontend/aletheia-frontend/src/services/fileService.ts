import apiClient from "../api/axios";

export const uploadBookCover = async (
    bookId: number,
    file: File
) => {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await apiClient.post(
            `/admin/books/${bookId}/cover`,
            formData
        );

    return response.data;
};