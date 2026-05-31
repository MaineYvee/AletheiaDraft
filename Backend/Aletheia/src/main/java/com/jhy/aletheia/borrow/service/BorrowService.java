package com.jhy.aletheia.borrow.service;

import com.jhy.aletheia.audit.service.AuditService;
import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.book.repository.BookRepository;
import com.jhy.aletheia.borrow.dto.BorrowResponse;
import com.jhy.aletheia.borrow.entity.BorrowRecordEntity;
import com.jhy.aletheia.borrow.repository.BorrowRepository;
import com.jhy.aletheia.exception.BadRequestException;
import com.jhy.aletheia.exception.ResourceNotFoundException;
import com.jhy.aletheia.reservation.service.ReservationService;
import com.jhy.aletheia.security.service.AuthenticatedUserService;
import com.jhy.aletheia.borrow.entity.BorrowStatus;

import java.time.LocalDate;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BorrowService {

    private static final int MAX_BORROW_LIMIT = 5;

    private static final int BORROW_DAYS = 14;

    private final BorrowRepository borrowRepository;

    private final BookRepository bookRepository;

    private final AuthenticatedUserService authenticatedUserService;

    private final ReservationService reservationService;

    private final AuditService auditService;

    @Transactional
    public void borrowBook(
            Long bookId
    ) {

        UserEntity user = authenticatedUserService
                        .getCurrentUser();

        validateBorrowLimit(user);

        BookEntity book = bookRepository
                        .findByIdAndArchivedFalse(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        validateAvailability(book);

        BorrowRecordEntity record =
                new BorrowRecordEntity();

        record.setUser(user);

        record.setBook(book);

        record.setBorrowDate(
                LocalDate.now()
        );

        record.setDueDate(
                LocalDate.now()
                        .plusDays(BORROW_DAYS)
        );

        record.setStatus(
                BorrowStatus.BORROWED
        );

        book.setAvailableCopies(
                book.getAvailableCopies() - 1
        );

        borrowRepository.save(record);

        bookRepository.save(book);

        auditService.logAction(
                user,
                "BORROW_BOOK",
                "Borrowed book: "
                        + book.getTitle()
        );
    }

    @Transactional
    public void returnBook(
            Long borrowId
    ) {

        BorrowRecordEntity record =
                borrowRepository.findById(borrowId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Borrow record not found"
                                )
                        );

        if (record.getStatus() == BorrowStatus.RETURNED) {

            throw new BadRequestException(
                    "Book already returned"
            );
        }

        BookEntity book = record.getBook();

        book.setAvailableCopies(
                book.getAvailableCopies() + 1
        );

        record.setReturnedDate(
                LocalDate.now()
        );

        record.setStatus(
                BorrowStatus.RETURNED
        );

        reservationService.activateNextReservation(book);

        borrowRepository.save(record);

        bookRepository.save(book);

        auditService.logAction(
                record.getUser(),
                "RETURN_BOOK",
                "Returned book: "
                        + book.getTitle()
        );
    }

    public List<BorrowResponse>
    getOverdueBooks() {

        updateOverdueStatuses();

        List<BorrowRecordEntity> overdueBooks =
                borrowRepository
                        .findByStatus(
                                BorrowStatus.OVERDUE
                        );

        return overdueBooks.stream()
                .map(this::mapToResponse)
                .toList();
    }


    private void updateOverdueStatuses() {

        List<BorrowRecordEntity> borrowedBooks =
                borrowRepository
                        .findByStatus(
                                BorrowStatus.BORROWED
                        );

        LocalDate today = LocalDate.now();

        for (
                BorrowRecordEntity borrow
                : borrowedBooks
        ) {

            if (
                    today.isAfter(
                            borrow.getDueDate()
                    )
            ) {

                borrow.setStatus(
                        BorrowStatus.OVERDUE
                );

                borrowRepository.save(borrow);
            }
        }
    }

    public List<BorrowResponse>
    getBorrowHistory() {

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        return borrowRepository
                .findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BorrowResponse>
    getBorrowedBooks() {

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        return borrowRepository
                .findByUserAndStatus(
                        user,
                        BorrowStatus.BORROWED
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private void validateBorrowLimit(
            UserEntity user
    ) {

        long borrowedBooks =
                borrowRepository
                        .countByUserAndStatus(
                                user,
                                BorrowStatus.BORROWED
                        );

        if (borrowedBooks >= MAX_BORROW_LIMIT) {

            throw new BadRequestException(
                    "Borrow limit reached"
            );
        }
    }

    private void validateAvailability(
            BookEntity book
    ) {

        if (book.getAvailableCopies() <= 0) {

            throw new BadRequestException(
                    "Book is unavailable"
            );
        }
    }

    private BorrowResponse mapToResponse(
            BorrowRecordEntity record
    ) {

        return BorrowResponse.builder()
                .borrowId(record.getId())
                .bookTitle(
                        record.getBook().getTitle()
                )
                .author(
                        record.getBook().getAuthor()
                )
                .borrowDate(
                        record.getBorrowDate()
                )
                .dueDate(
                        record.getDueDate()
                )
                .overdue(
                        LocalDate.now()
                                .isAfter(
                                        record.getDueDate()
                                )
                )
                .status(
                        record.getStatus().name()
                )

                .returnedDate(
                        record.getReturnedDate()
                )
                .build();
    }
}
