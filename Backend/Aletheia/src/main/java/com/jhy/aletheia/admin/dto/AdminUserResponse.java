package com.jhy.aletheia.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminUserResponse {

    private Long id;

    private String studentId;

    private String firstName;

    private String lastName;

    private String email;

    private String role;

    private boolean enabled;
}