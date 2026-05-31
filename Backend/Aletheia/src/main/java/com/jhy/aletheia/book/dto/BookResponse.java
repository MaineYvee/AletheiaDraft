package com.jhy.aletheia.book.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookResponse {

    private Long id;

    private String title;

    private String author;

    private String isbn;

    private String description;

    private String category;

    private Integer totalCopies;

    private Integer availableCopies;

    private boolean available;

    private String coverImageUrl;

}