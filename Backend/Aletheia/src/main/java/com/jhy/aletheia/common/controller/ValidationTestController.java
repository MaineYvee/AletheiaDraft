package com.jhy.aletheia.common.controller;


import com.jhy.aletheia.common.dto.SampleRequest;
import com.jhy.aletheia.common.response.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class ValidationTestController {

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<String>> validateRequest(
            @Valid @RequestBody SampleRequest request
    ) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Validation successful",
                        "Valid Request"
                )
        );
    }
}