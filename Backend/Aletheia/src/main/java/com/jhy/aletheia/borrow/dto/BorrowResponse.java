package com.jhy.aletheia.borrow.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BorrowResponse {

    private Long borrowId;

    private String bookTitle;

    private String author;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private boolean overdue;

    private String status;

    private LocalDate returnedDate;
}