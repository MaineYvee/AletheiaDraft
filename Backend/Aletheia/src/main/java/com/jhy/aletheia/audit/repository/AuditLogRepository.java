package com.jhy.aletheia.audit.repository;

import com.jhy.aletheia.audit.entity.AuditLogEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLogEntity, Long> {
}