package com.jhy.aletheia.audit.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AuditLogResponse {

    private Long id;

    private String user;

    private String action;

    private String details;

    private LocalDateTime createdAt;
}