package com.jhy.aletheia.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponse {

    private long totalBooks;

    private long totalUsers;

    private long borrowedBooks;

    private long reservations;

    private long overdueBooks;
}