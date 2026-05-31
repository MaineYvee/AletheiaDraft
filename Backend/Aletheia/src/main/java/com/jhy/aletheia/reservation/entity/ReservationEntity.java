package com.jhy.aletheia.reservation.entity;

import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.common.entity.BaseEntity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.EnumType;

import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
public class ReservationEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private UserEntity user;

    @ManyToOne(optional = false)
    private BookEntity book;

    @Column(nullable = false)
    private LocalDateTime reservedAt;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private Integer queuePosition;

    @Column(nullable = false)
    private boolean fulfilled = false;
}