import apiClient from "../api/axios";

export const getAuditLogs = async () => {

    const response =
        await apiClient.get(
            "/admin/audit-logs"
        );

    return response.data;
};

export const createBook = async (
    bookData: unknown
) => {

    const response =
        await apiClient.post(
            "/admin/books",
            bookData
        );

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

export const updateBook = (
    id: number,
    book: {
        title: string;
        author: string;
        isbn: string;
        category: string;
        description: string;
        totalCopies: number;
    }
) => {
    return apiClient.put(
        `/admin/books/${id}`,
        book
    );
};

export const archiveBook = async (
    id: number
) => {

    const response =
        await apiClient.delete(
            `/admin/books/${id}`
        );

    return response.data;
};

export const updateInventory = async (
    id: number,
    totalCopies: number
) => {

    const response =
        await apiClient.patch(
            `/admin/books/${id}/inventory`,
            {
                totalCopies
            }
        );

    return response.data;
};

export const uploadCover = async (
    id: number,
    file: File
) => {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await apiClient.post(
            `/admin/books/${id}/cover`,
            formData
        );

    return response.data;
};

export const getAdminDashboard =
    async () => {

        const response =
            await apiClient.get(
                "/admin/dashboard"
            );

        return response.data;
    };