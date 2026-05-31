package com.jhy.aletheia.borrow.entity;

import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.book.entity.BookEntity;
import com.jhy.aletheia.common.entity.BaseEntity;
import java.time.LocalDate;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "borrow_records")
@Getter
@Setter
public class BorrowRecordEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private UserEntity user;

    @ManyToOne(optional = false)
    private BookEntity book;

    @Column(nullable = false)
    private LocalDate borrowDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    private LocalDate returnedDate;

    @Enumerated(EnumType.STRING)
    private BorrowStatus status;

    @Column(nullable = false)
    private boolean returned = false;


}