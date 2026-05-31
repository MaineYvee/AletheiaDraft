package com.jhy.aletheia.admin.service;

import com.jhy.aletheia.admin.dto.AdminBookRequest;
import com.jhy.aletheia.admin.dto.AdminDashboardResponse;
import com.jhy.aletheia.admin.dto.AdminUserResponse;
import com.jhy.aletheia.admin.dto.InventoryUpdateRequest;

import com.jhy.aletheia.audit.dto.AuditLogResponse;
import com.jhy.aletheia.audit.repository.AuditLogRepository;
import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.auth.repository.UserRepository;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.audit.service.AuditService;
import com.jhy.aletheia.borrow.repository.BorrowRepository;
import com.jhy.aletheia.reservation.repository.ReservationRepository;
import com.jhy.aletheia.security.service.AuthenticatedUserService;

import com.jhy.aletheia.book.repository.BookRepository;

import com.jhy.aletheia.exception.ResourceNotFoundException;

import com.jhy.aletheia.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BookRepository bookRepository;

    private final AuditLogRepository auditLogRepository;

    private final AuditService auditService;

    private final AuthenticatedUserService authenticatedUserService;

    private final FileStorageService fileStorageService;

    private final UserRepository userRepository;

    private final BorrowRepository borrowRepository;

    private final ReservationRepository reservationRepository;

    public List<AuditLogResponse>
    getAuditLogs() {

        return auditLogRepository.findAll()
                .stream()
                .map(log -> AuditLogResponse.builder()
                        .id(log.getId())
                        .user(
                                log.getUser()
                                        .getFirstName()
                                        + " "
                                        + log.getUser()
                                        .getLastName()
                        )
                        .action(log.getAction())
                        .details(log.getDetails())
                        .createdAt(log.getCreatedAt())
                        .build()
                )
                .toList();
    }

    public void createBook(
            AdminBookRequest request
    ) {

        BookEntity book =
                new BookEntity();

        book.setTitle(request.getTitle());

        book.setAuthor(request.getAuthor());

        book.setIsbn(request.getIsbn());

        book.setTotalCopies(
                request.getTotalCopies()
        );

        book.setCategory(request.getCategory());

        book.setAvailableCopies(
                request.getTotalCopies()
        );

        bookRepository.save(book);

        UserEntity admin =
                authenticatedUserService
                        .getCurrentUser();

        auditService.logAction(
                admin,
                "CREATE_BOOK",
                "Created book: "
                        + book.getTitle()
        );
    }

    public void updateBook(
            Long bookId,
            AdminBookRequest request
    ) {

        BookEntity book =
                bookRepository
                        .findById(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        int borrowedCopies =
                book.getTotalCopies()
                        - book.getAvailableCopies();

        if (request.getTotalCopies() < borrowedCopies) {

            throw new IllegalArgumentException(
                    "Total copies cannot be less than borrowed copies"
            );
        }

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());

        book.setTotalCopies(
                request.getTotalCopies()
        );

        book.setAvailableCopies(
                request.getTotalCopies()
                        - borrowedCopies
        );

        bookRepository.save(book);

        UserEntity admin =
                authenticatedUserService
                        .getCurrentUser();

        auditService.logAction(
                admin,
                "UPDATE_BOOK",
                "Updated book: "
                        + book.getTitle()
        );
    }

    public void updateInventory(

            Long bookId,

            InventoryUpdateRequest request
    ) {

        UserEntity admin =
                authenticatedUserService
                        .getCurrentUser();

        BookEntity book =
                bookRepository
                        .findById(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        int borrowedCopies =
                book.getTotalCopies()
                        -
                        book.getAvailableCopies();

        int newAvailableCopies =
                request.getTotalCopies()
                        -
                        borrowedCopies;

        if (newAvailableCopies < 0) {

            newAvailableCopies = 0;
        }

        book.setTotalCopies(
                request.getTotalCopies()
        );

        book.setAvailableCopies(
                newAvailableCopies
        );

        bookRepository.save(book);

        auditService.logAction(
                admin,
                "UPDATE_INVENTORY",
                "Updated inventory for: "
                        + book.getTitle()
        );
    }

    public void archiveBook(
            Long bookId
    ) {

        BookEntity book =
                bookRepository
                        .findById(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        book.setArchived(true);

        bookRepository.save(book);

        UserEntity admin =
                authenticatedUserService
                        .getCurrentUser();

        auditService.logAction(
                admin,
                "ARCHIVE_BOOK",
                "Archived book: "
                        + book.getTitle()
        );
    }

    public void uploadBookCover(
            Long bookId,
            MultipartFile file
    ) {

        BookEntity book =
                bookRepository
                        .findByIdAndArchivedFalse(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        // delete old image first
        if (book.getCoverImageUrl() != null) {

            fileStorageService.deleteFile(
                    book.getCoverImageUrl()
            );
        }

        String imageUrl =
                fileStorageService
                        .uploadBookCover(file);

        book.setCoverImageUrl(imageUrl);

        bookRepository.save(book);
    }

    public void deleteBookCover(
            Long bookId
    ) {

        BookEntity book =
                bookRepository
                        .findByIdAndArchivedFalse(bookId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        if (book.getCoverImageUrl() != null) {

            fileStorageService.deleteFile(
                    book.getCoverImageUrl()
            );

            book.setCoverImageUrl(null);

            bookRepository.save(book);
        }
    }

    public List<AdminUserResponse> getUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> AdminUserResponse.builder()
                        .id(user.getId())
                        .studentId(user.getStudentId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .enabled(user.isEnabled())
                        .build()
                )
                .toList();
    }

    public AdminDashboardResponse
    getDashboard() {

        long totalBooks =
                bookRepository.count();

        long totalUsers =
                userRepository.count();

        long borrowedBooks =
                borrowRepository
                        .countByReturnedFalse();

        long reservations =
                reservationRepository.count();

        long overdueBooks =
                borrowRepository
                        .countByReturnedFalseAndDueDateBefore(
                                LocalDate.now()
                        );

        return AdminDashboardResponse
                .builder()
                .totalBooks(totalBooks)
                .totalUsers(totalUsers)
                .borrowedBooks(borrowedBooks)
                .reservations(reservations)
                .overdueBooks(overdueBooks)
                .build();
    }

}