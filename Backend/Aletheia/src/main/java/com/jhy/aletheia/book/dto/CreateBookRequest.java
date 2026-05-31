package com.jhy.aletheia.book.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBookRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "ISBN is required")
    private String isbn;

    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Total copies is required")
    @Min(value = 1,
            message = "Total copies must be at least 1")
    private Integer totalCopies;
}