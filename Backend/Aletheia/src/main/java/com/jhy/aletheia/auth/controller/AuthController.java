package com.jhy.aletheia.auth.controller;

import com.jhy.aletheia.auth.dto.*;
import com.jhy.aletheia.auth.service.AuthService;
import com.jhy.aletheia.common.response.ApiResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(

            @Valid @RequestBody RegisterRequest request
    ) {

        authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Registration successful",
                        null
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(

            @Valid @RequestBody LoginRequest request
    ) {

        AuthResponse response =
                authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Login successful",
                        response
                )
        );
    }

    @PatchMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(

            @Valid
            @RequestBody
            ChangePasswordRequest request
    ) {

        authService.changePassword(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Password changed successfully",
                        null
                )
        );
    }

    /*@PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>>
    verifyAccount(

            @Valid
            @RequestBody
            VerifyRequest request
    ) {

        authService.verifyAccount(
                request.getToken()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Account verified successfully",
                        null
                )
        );
    }*/
}