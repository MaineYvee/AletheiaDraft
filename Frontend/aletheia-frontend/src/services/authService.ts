import apiClient from "../api/axios";

export interface RegisterRequest {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const register = async (
    data: RegisterRequest
) => {

    const response =
        await apiClient.post(
            "/auth/register",
            data
        );

    return response.data;
};

export const login = async (
    data: LoginRequest
) => {

    const response =
        await apiClient.post(
            "/auth/login",
            data
        );

    return response.data;
};