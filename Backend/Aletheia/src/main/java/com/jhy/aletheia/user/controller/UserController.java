package com.jhy.aletheia.user.controller;

import com.jhy.aletheia.common.response.ApiResponse;
import com.jhy.aletheia.user.dto.ProfileResponse;
import com.jhy.aletheia.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ProfileResponse>>
    getProfile() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Profile retrieved successfully",
                        userService.getProfile()
                )
        );
    }

    @PostMapping(
            value = "/profile-picture",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<ApiResponse<String>>
    uploadProfilePicture(

            @RequestParam("file")
            MultipartFile file
    ) {

        userService.uploadProfilePicture(file);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Profile picture uploaded successfully",
                        null
                )
        );
    }
}