package com.jhy.aletheia.book.service;

import com.jhy.aletheia.book.dto.BookResponse;
import com.jhy.aletheia.book.dto.CreateBookRequest;
import com.jhy.aletheia.book.dto.PaginatedBookResponse;
import com.jhy.aletheia.book.dto.UpdateBookRequest;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.book.repository.BookRepository;
import com.jhy.aletheia.exception.BadRequestException;
import com.jhy.aletheia.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public BookResponse createBook(
            CreateBookRequest request
    ) {

        validateUniqueIsbn(request.getIsbn());

        BookEntity book = new BookEntity();

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setDescription(request.getDescription());
        book.setCategory(request.getCategory());

        book.setTotalCopies(
                request.getTotalCopies()
        );

        book.setAvailableCopies(
                request.getTotalCopies()
        );

        BookEntity savedBook =
                bookRepository.save(book);

        return mapToResponse(savedBook);
    }

    @Transactional
    public BookResponse updateBook(Long id, UpdateBookRequest request) {

        BookEntity book = bookRepository
                .findByIdAndArchivedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found")
                );

        // 🧠 SAVE ORIGINAL VALUE FIRST
        int originalTotal = book.getTotalCopies();
        int available = book.getAvailableCopies();

        int borrowedCopies = originalTotal - available;

        if (request.getTotalCopies() < borrowedCopies) {
            throw new BadRequestException(
                    "Total copies cannot be less than borrowed copies"
            );
        }

        // ✏️ update fields
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setDescription(request.getDescription());
        book.setCategory(request.getCategory());

        book.setTotalCopies(request.getTotalCopies());
        book.setAvailableCopies(request.getTotalCopies() - borrowedCopies);

        return mapToResponse(bookRepository.save(book));
    }

    public void deleteBook(Long id) {

        BookEntity book =
                bookRepository
                        .findByIdAndArchivedFalse(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                        );

        if (
                book.getAvailableCopies()
                        !=
                        book.getTotalCopies()
        ) {

            throw new BadRequestException(
                    "Cannot archive borrowed book"
            );
        }

        book.setArchived(true);

        bookRepository.save(book);
    }

    public List<BookResponse> getAllBooks() {

        return bookRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public BookResponse getBookById(Long id) {

        BookEntity book = bookRepository
                .findByIdAndArchivedFalse(id)
                .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Book not found"
                                )
                );

        return mapToResponse(book);
    }

    private void validateUniqueIsbn(
            String isbn
    ) {

        if (bookRepository.existsByIsbn(isbn)) {

            throw new BadRequestException(
                    "ISBN already exists"
            );
        }
    }

    private BookResponse mapToResponse(
            BookEntity book
    ) {

        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .description(book.getDescription())
                .category(book.getCategory())
                .totalCopies(book.getTotalCopies())
                .availableCopies(
                        book.getAvailableCopies()
                )
                .available(
                        book.getAvailableCopies() > 0
                )
                .coverImageUrl(
                        book.getCoverImageUrl()
                )
                .build();
    }

    public PaginatedBookResponse searchBooks(

            String keyword,

            int page,

            int size,

            String sortBy
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(sortBy)
                                .ascending()
                );

        Page<BookEntity> result =
                bookRepository
                        .findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                                keyword,
                                keyword,
                                pageable
                        );

        List<BookResponse> books =
                result.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return PaginatedBookResponse.builder()
                .books(books)
                .currentPage(result.getNumber())
                .totalPages(result.getTotalPages())
                .totalElements(result.getTotalElements())
                .last(result.isLast())
                .build();
    }

    public PaginatedBookResponse searchByTitle(

            String title,

            int page,

            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<BookEntity> result =
                bookRepository
                        .findByTitleContainingIgnoreCase(
                                title,
                                pageable
                        );

        return buildPaginatedResponse(result);
    }

    public PaginatedBookResponse searchByAuthor(

            String author,

            int page,

            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<BookEntity> result =
                bookRepository
                        .findByAuthorContainingIgnoreCase(
                                author,
                                pageable
                        );

        return buildPaginatedResponse(result);
    }

    public PaginatedBookResponse searchByIsbn(

            String isbn,

            int page,

            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<BookEntity> result =
                bookRepository
                        .findByIsbnContainingIgnoreCase(
                                isbn,
                                pageable
                        );

        return buildPaginatedResponse(result);
    }

    private PaginatedBookResponse
    buildPaginatedResponse(
            Page<BookEntity> result
    ) {

        List<BookResponse> books =
                result.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return PaginatedBookResponse.builder()
                .books(books)
                .currentPage(result.getNumber())
                .totalPages(result.getTotalPages())
                .totalElements(result.getTotalElements())
                .last(result.isLast())
                .build();
    }
}