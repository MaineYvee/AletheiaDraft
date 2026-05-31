package com.jhy.aletheia.reservation.repository;

import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.reservation.entity.ReservationEntity;
import com.jhy.aletheia.reservation.entity.ReservationStatus;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository
        extends JpaRepository<ReservationEntity, Long> {

    boolean existsByUserAndBookAndFulfilledFalse(
            UserEntity user,
            BookEntity book
    );

    List<ReservationEntity> findByUserAndFulfilledFalse(
            UserEntity user
    );

    List<ReservationEntity> findByBookAndFulfilledFalseOrderByReservedAtAsc(
            BookEntity book
    );

    List<ReservationEntity>
    findByUser(
            UserEntity user
    );

    List<ReservationEntity>
    findByBookAndStatusOrderByReservedAtAsc(
            BookEntity book,
            ReservationStatus status
    );

    Optional<ReservationEntity>
    findFirstByBookAndStatusOrderByReservedAtAsc(
            BookEntity book,
            ReservationStatus status
    );

    long count();
}