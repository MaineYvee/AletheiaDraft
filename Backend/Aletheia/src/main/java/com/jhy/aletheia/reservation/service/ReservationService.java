package com.jhy.aletheia.reservation.service;

import com.jhy.aletheia.audit.service.AuditService;
import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.book.repository.BookRepository;
import com.jhy.aletheia.exception.BadRequestException;
import com.jhy.aletheia.exception.ResourceNotFoundException;
import com.jhy.aletheia.reservation.dto.ReservationResponse;
import com.jhy.aletheia.reservation.entity.ReservationEntity;
import com.jhy.aletheia.reservation.repository.ReservationRepository;
import com.jhy.aletheia.security.service.AuthenticatedUserService;
import com.jhy.aletheia.reservation.entity.ReservationStatus;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final AuditService auditService;

    private final AuthenticatedUserService authenticatedUserService;

    private final BookRepository bookRepository;

    public void reserveBook(
            Long bookId
    ) {

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        BookEntity book = bookRepository
                        .findByIdAndArchivedFalse(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        validateBookUnavailable(book);

        boolean alreadyReserved =
                reservationRepository
                        .findByUser(user)
                        .stream()
                        .anyMatch(reservation ->

                                reservation.getBook()
                                        .getId()
                                        .equals(bookId)

                                        &&

                                        reservation.getStatus()
                                                != ReservationStatus.CANCELLED
                        );

        if (alreadyReserved) {

            throw new BadRequestException(
                    "Book already reserved"
            );
        }

        int queuePosition =
                reservationRepository
                        .findByBookAndStatusOrderByReservedAtAsc(
                                book,
                                ReservationStatus.PENDING
                        )
                        .size() + 1;

        ReservationEntity reservation =
                new ReservationEntity();

        reservation.setUser(user);

        reservation.setBook(book);

        reservation.setReservedAt(
                LocalDateTime.now()
        );

        reservation.setStatus(
                ReservationStatus.PENDING
        );

        reservation.setQueuePosition(
                queuePosition
        );

        reservationRepository.save(reservation);

        auditService.logAction(
                user,
                "RESERVE_BOOK",
                "Reserved book: "
                        + book.getTitle()
        );
    }

    public List<ReservationResponse> getBookQueue(
            Long bookId
    ) {

        BookEntity book = bookRepository
                        .findByIdAndArchivedFalse(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        List<ReservationEntity> reservations =
                reservationRepository
                        .findByBookAndStatusOrderByReservedAtAsc(
                                book,
                                ReservationStatus.PENDING
                        );

        return reservations.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void cancelReservation(
            Long reservationId
    ) {

        UserEntity currentUser =
                authenticatedUserService
                        .getCurrentUser();

        ReservationEntity reservation =
                reservationRepository
                        .findById(reservationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Reservation not found"
                                )
                        );

        boolean ownsReservation =
                reservation.getUser()
                        .getId()
                        .equals(currentUser.getId());

        boolean adminAccess =
                currentUser.getRole()
                        .name()
                        .equals("ADMIN");

        if (
                !ownsReservation
                        &&
                        !adminAccess
        ) {

            throw new BadRequestException(
                    "Not allowed to cancel reservation"
            );
        }

        reservation.setStatus(
                ReservationStatus.CANCELLED
        );

        reservationRepository.save(reservation);

        auditService.logAction(
                currentUser,
                "CANCEL_RESERVATION",
                "Cancelled reservation for: "
                        + reservation.getBook().getTitle()
        );


        reorderQueuePositions(
                reservation.getBook()
        );
    }

    private void reorderQueuePositions(
            BookEntity book
    ) {

        List<ReservationEntity> reservations =
                reservationRepository
                        .findByBookAndStatusOrderByReservedAtAsc(
                                book,
                                ReservationStatus.PENDING
                        );

        int position = 1;

        for (
                ReservationEntity reservation
                : reservations
        ) {

            reservation.setQueuePosition(
                    position++
            );

            reservationRepository.save(
                    reservation
            );
        }
    }

    public void activateNextReservation(
            BookEntity book
    ) {

        Optional<ReservationEntity> nextReservation =
                reservationRepository
                        .findFirstByBookAndStatusOrderByReservedAtAsc(
                                book,
                                ReservationStatus.PENDING
                        );

        if (nextReservation.isPresent()) {

            ReservationEntity reservation =
                    nextReservation.get();

            reservation.setStatus(
                    ReservationStatus.READY_FOR_PICKUP
            );

            reservationRepository.save(
                    reservation
            );
        }
    }

    public List<ReservationResponse> getUserReservations(){

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        return reservationRepository
                .findByUserAndFulfilledFalse(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private void validateBookUnavailable(
            BookEntity book
    ) {

        if (book.getAvailableCopies() > 0) {

            throw new BadRequestException(
                    "Book is currently available and does not need reservation"
            );
        }
    }

    private void validateDuplicateReservation(
            UserEntity user,
            BookEntity book
    ) {

        boolean exists =
                reservationRepository
                        .existsByUserAndBookAndFulfilledFalse(
                                user,
                                book
                        );

        if (exists) {

            throw new BadRequestException(
                    "You already reserved this book"
            );
        }
    }

    private ReservationResponse mapToResponse(
            ReservationEntity reservation
    ) {

        List<ReservationEntity> queue =
                reservationRepository
                        .findByBookAndFulfilledFalseOrderByReservedAtAsc(
                                reservation.getBook()
                        );

        int position =
                queue.indexOf(reservation) + 1;

        return ReservationResponse.builder()
                .reservationId(
                        reservation.getId()
                )
                .bookTitle(
                        reservation.getBook().getTitle()
                )
                .author(
                        reservation.getBook().getAuthor()
                )
                .status(
                        reservation.getStatus().name()
                )

                .queuePosition(
                        reservation.getQueuePosition()
                )

                .reservedAt(
                        reservation.getReservedAt()
                )
                .build();
    }
}