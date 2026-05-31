package com.jhy.aletheia.admin.dto;

import jakarta.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryUpdateRequest {

    @Min(0)
    private int totalCopies;
}