package com.jhy.aletheia.admin.dto;

import jakarta.validation.constraints.Min;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminBookRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    @NotBlank
    private String isbn;

    @NotBlank
    private String category;

    private String description;

    @Min(1)
    private int totalCopies;

}