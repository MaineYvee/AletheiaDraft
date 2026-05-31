package com.jhy.aletheia.admin.controller;

import com.jhy.aletheia.admin.dto
        .AdminBookRequest;

import com.jhy.aletheia.admin.dto.AdminDashboardResponse;
import com.jhy.aletheia.admin.dto
        .InventoryUpdateRequest;

import com.jhy.aletheia.admin.service
        .AdminService;

import com.jhy.aletheia.common.response
        .ApiResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService
            adminService;

    @PostMapping("/books")
    public ResponseEntity<ApiResponse<String>>
    createBook(

            @Valid
            @RequestBody
            AdminBookRequest request
    ) {

        adminService.createBook(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book created successfully",
                        null
                )
        );
    }

    @PutMapping("/books/{bookId}")
    public ResponseEntity<ApiResponse<String>>
    updateBook(

            @PathVariable Long bookId,

            @Valid
            @RequestBody
            AdminBookRequest request
    ) {

        adminService.updateBook(
                bookId,
                request
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book updated successfully",
                        null
                )
        );
    }

    @PatchMapping(
            "/books/{bookId}/inventory"
    )
    public ResponseEntity<ApiResponse<String>>
    updateInventory(

            @PathVariable Long bookId,

            @Valid
            @RequestBody
            InventoryUpdateRequest request
    ) {

        adminService.updateInventory(
                bookId,
                request
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Inventory updated successfully",
                        null
                )
        );
    }

    @DeleteMapping("/books/{bookId}")
    public ResponseEntity<ApiResponse<String>>
    archiveBook(

            @PathVariable Long bookId
    ) {

        adminService.archiveBook(bookId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book archived successfully",
                        null
                )
        );
    }

    @GetMapping("/borrow/overdue")
    public ResponseEntity<ApiResponse<?>>
    getOverdueBooks() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Overdue books retrieved",
                        null
                )
        );
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<?>>
    getUsers() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Users retrieved",
                        adminService.getUsers()
                )
        );
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<ApiResponse<?>>
    getAuditLogs() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Audit logs retrieved",
                        adminService.getAuditLogs()
                )
        );
    }

    @PostMapping(
            value = "/books/{bookId}/cover",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<ApiResponse<String>>
    uploadBookCover(

            @PathVariable Long bookId,

            @RequestParam("file")
            MultipartFile file
    ) {

        adminService.uploadBookCover(
                bookId,
                file
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book cover uploaded successfully",
                        null
                )
        );
    }

    @DeleteMapping("/books/{bookId}/cover")
    public ResponseEntity<ApiResponse<String>>
    deleteBookCover(

            @PathVariable Long bookId
    ) {

        adminService.deleteBookCover(bookId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Book cover deleted successfully",
                        null
                )
        );
    }

    @GetMapping("/dashboard")
    public ResponseEntity<
            ApiResponse<AdminDashboardResponse>
            > getDashboard() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Dashboard retrieved successfully",
                        adminService.getDashboard()
                )
        );
    }
}