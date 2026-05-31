package com.jhy.aletheia.reservation.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReservationResponse {

    private Long reservationId;

    private String bookTitle;

    private String author;

    private String status;

    private LocalDateTime reservedAt;

    private int queuePosition;
}