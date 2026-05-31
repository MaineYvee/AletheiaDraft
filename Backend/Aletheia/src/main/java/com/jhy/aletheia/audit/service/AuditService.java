package com.jhy.aletheia.audit.service;

import com.jhy.aletheia.audit.entity.AuditLogEntity;
import com.jhy.aletheia.audit.repository.AuditLogRepository;
import com.jhy.aletheia.auth.entity.UserEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void logAction(
            UserEntity user,
            String action,
            String details
    ) {

        AuditLogEntity log =
                new AuditLogEntity();

        log.setUser(user);

        log.setAction(action);

        log.setDetails(details);

        log.setCreatedAt(
                LocalDateTime.now()
        );

        auditLogRepository.save(log);
    }
}