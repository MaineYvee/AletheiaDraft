package com.jhy.aletheia.borrow.controller;

import com.jhy.aletheia.borrow.dto.BorrowResponse;
import com.jhy.aletheia.borrow.service.BorrowService;
import com.jhy.aletheia.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping("/{bookId}")
    public ResponseEntity<ApiResponse<String>>
    borrowBook(

            @PathVariable Long bookId
    ) {

        borrowService.borrowBook(bookId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book borrowed successfully",
                        null
                )
        );
    }

    @PostMapping("/return/{borrowId}")
    public ResponseEntity<ApiResponse<String>>
    returnBook(

            @PathVariable Long borrowId
    ) {

        borrowService.returnBook(borrowId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book returned successfully",
                        null
                )
        );
    }

    @GetMapping("/overdue")
    public ResponseEntity<
            ApiResponse<List<BorrowResponse>>
            > getOverdueBooks() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Overdue books retrieved",
                        borrowService.getOverdueBooks()
                )
        );
    }

    @GetMapping("/history")
    public ResponseEntity<
            ApiResponse<List<BorrowResponse>>
            > getBorrowHistory() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Borrow history retrieved",
                        borrowService.getBorrowHistory()
                )
        );
    }

    @GetMapping("/my-books")
    public ResponseEntity<
            ApiResponse<List<BorrowResponse>>
            > getBorrowedBooks(

    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Borrowed books retrieved",
                        borrowService.getBorrowedBooks()
                )
        );
    }
}