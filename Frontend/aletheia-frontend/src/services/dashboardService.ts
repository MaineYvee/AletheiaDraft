import {
    getBorrowedBooks
} from "./borrowService";

import {
    getReservations
} from "./reservationService";

export const getDashboardData =
    async () => {

        const [
            borrowedResponse,
            reservationResponse
        ] = await Promise.all([

            getBorrowedBooks(),

            getReservations()

        ]);

        return {

            borrowedCount:
            borrowedResponse.data.length,

            reservationCount:
            reservationResponse.data.length,

            borrowedBooks:
            borrowedResponse.data,

            reservations:
            reservationResponse.data
        };
    };