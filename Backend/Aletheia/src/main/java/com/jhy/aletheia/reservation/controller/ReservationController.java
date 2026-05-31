package com.jhy.aletheia.reservation.controller;

import com.jhy.aletheia.common.response.ApiResponse;
import com.jhy.aletheia.reservation.dto.ReservationResponse;
import com.jhy.aletheia.reservation.service.ReservationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService
            reservationService;

    @PostMapping("/{bookId}")
    public ResponseEntity<ApiResponse<String>>
    reserveBook(

            @PathVariable Long bookId
    ) {

        reservationService.reserveBook(bookId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book reserved successfully",
                        null
                )
        );
    }

    @GetMapping("/my-reservations")
    public ResponseEntity<
            ApiResponse<List<ReservationResponse>>
            > getUserReservations(

    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Reservations retrieved successfully",
                        reservationService.getUserReservations()
                )
        );
    }

    @GetMapping("/queue/{bookId}")
    public ResponseEntity<
            ApiResponse<List<ReservationResponse>>
            > getBookQueue(

            @PathVariable Long bookId
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Reservation queue retrieved",
                        reservationService
                                .getBookQueue(bookId)
                )
        );
    }

    @DeleteMapping("/cancel/{reservationId}")
    public ResponseEntity<ApiResponse<String>>
    cancelReservation(

            @PathVariable Long reservationId
    ) {

        reservationService.cancelReservation(
                reservationId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Reservation cancelled successfully",
                        null
                )
        );
    }
}