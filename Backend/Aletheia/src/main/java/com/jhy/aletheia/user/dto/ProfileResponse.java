package com.jhy.aletheia.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private Long id;

    private String studentId;

    private String firstName;

    private String lastName;

    private String email;

    private String role;

    private String profilePictureUrl;
}