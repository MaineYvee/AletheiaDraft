package com.jhy.aletheia.borrow.repository;

import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.borrow.entity.BorrowRecordEntity;
import com.jhy.aletheia.borrow.entity.BorrowStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BorrowRepository extends JpaRepository<BorrowRecordEntity, Long> {

    List<BorrowRecordEntity> findByStatus(
            BorrowStatus status
    );

    List<BorrowRecordEntity> findByUser(
            UserEntity user
    );

    List<BorrowRecordEntity>
    findByUserAndStatus(
            UserEntity user,
            BorrowStatus status
    );

    long countByUserAndStatus(
            UserEntity user,
            BorrowStatus status
    );

    long countByReturnedFalse();

    long countByReturnedFalseAndDueDateBefore(
            LocalDate date
    );

    List<BorrowRecordEntity>
    findByReturnedFalse();


}