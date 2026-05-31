package com.jhy.aletheia.book.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PaginatedBookResponse {

    private List<BookResponse> books;

    private int currentPage;

    private int totalPages;

    private long totalElements;

    private boolean last;
}