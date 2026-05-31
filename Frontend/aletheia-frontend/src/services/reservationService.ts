import apiClient from "../api/axios";

export const reserveBook =
    async (bookId: number) => {

        const response =
            await apiClient.post(
                `/reservations/${bookId}`
            );

        return response.data;
    };

export const getReservations =
    async () => {

        const response =
            await apiClient.get(
                "/reservations/my-reservations"
            );

        return response.data;
    };

export const cancelReservation =
    async (
        reservationId: number
    ) => {

        const response =
            await apiClient.delete(
                `/reservations/cancel/${reservationId}`
            );

        return response.data;
    };

export const getReservationQueue =
    async (
        bookId: number
    ) => {

        const response =
            await apiClient.get(
                `/reservations/queue/${bookId}`
            );

        return response.data;
    };