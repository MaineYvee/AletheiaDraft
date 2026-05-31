package com.jhy.aletheia.book.controller;

import com.jhy.aletheia.book.dto.BookResponse;
import com.jhy.aletheia.book.dto.CreateBookRequest;
import com.jhy.aletheia.book.dto.UpdateBookRequest;
import com.jhy.aletheia.book.service.BookService;
import com.jhy.aletheia.common.response.ApiResponse;
import com.jhy.aletheia.book.dto.PaginatedBookResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<BookResponse>>
    createBook(

            @Valid @RequestBody
            CreateBookRequest request
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book created successfully",
                        bookService.createBook(request)
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookResponse>>>
    getAllBooks() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Books retrieved successfully",
                        bookService.getAllBooks()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookResponse>>
    getBookById(

            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book retrieved successfully",
                        bookService.getBookById(id)
                )
        );
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<BookResponse>>
    updateBook(

            @PathVariable Long id,

            @Valid @RequestBody
            UpdateBookRequest request
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book updated successfully",
                        bookService.updateBook(id, request)
                )
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<String>>
    deleteBook(

            @PathVariable Long id
    ) {

        bookService.deleteBook(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book deleted successfully",
                        null
                )
        );
    }

    @GetMapping("/search")
    public ResponseEntity<
            ApiResponse<PaginatedBookResponse>
            > searchBooks(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(defaultValue = "title")
            String sortBy
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Books retrieved successfully",
                        bookService.searchBooks(
                                keyword,
                                page,
                                size,
                                sortBy
                        )
                )
        );
    }

    @GetMapping("/search/title")
    public ResponseEntity<
            ApiResponse<PaginatedBookResponse>
            > searchByTitle(

            @RequestParam String title,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Books retrieved successfully",
                        bookService.searchByTitle(
                                title,
                                page,
                                size
                        )
                )
        );
    }

    @GetMapping("/search/author")
    public ResponseEntity<
            ApiResponse<PaginatedBookResponse>
            > searchByAuthor(

            @RequestParam String author,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Books retrieved successfully",
                        bookService.searchByAuthor(
                                author,
                                page,
                                size
                        )
                )
        );
    }
    
    @GetMapping("/search/isbn")
    public ResponseEntity<ApiResponse<PaginatedBookResponse>> searchByIsbn(

            @RequestParam String isbn,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return ResponseEntity.ok(new ApiResponse<>(
                "Books retrieved successfully",
                        bookService.searchByIsbn(
                                isbn,
                                page,
                                size
                        )
                )
        );
    }

}