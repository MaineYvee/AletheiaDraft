package com.jhy.aletheia.book.repository;

import com.jhy.aletheia.book.entity.BookEntity;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

    boolean existsByIsbn(String isbn);

    Page<BookEntity>
    findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

    Page<BookEntity>
    findByAuthorContainingIgnoreCase(
            String author,
            Pageable pageable
    );

    Page<BookEntity>
    findByIsbnContainingIgnoreCase(
            String isbn,
            Pageable pageable
    );

    Page<BookEntity>
    findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
            String title,
            String author,
            Pageable pageable
    );

    List<BookEntity> findByArchivedFalse();

    Optional<BookEntity> findByIdAndArchivedFalse(
            Long id
    );

    Page<BookEntity>
    findByTitleContainingIgnoreCaseAndArchivedFalse(
            String title,
            Pageable pageable
    );
}