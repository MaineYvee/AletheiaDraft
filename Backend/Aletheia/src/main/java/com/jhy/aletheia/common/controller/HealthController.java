package com.jhy.aletheia.common.controller;

import com.jhy.aletheia.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponse<String>> health() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Backend is running",
                        "OK"
                )
        );
    }
}