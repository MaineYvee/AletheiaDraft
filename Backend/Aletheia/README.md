# Backend / Aletheia

## Overview

This folder contains the Spring Boot backend for Aletheia. It implements a REST API with layered architecture, role-based security, persistence using Spring Data JPA, and business logic separated into domain-specific packages.

## How the backend works

The backend follows a standard request lifecycle:

1. A client request arrives at a controller in `src/main/java/com/jhy/aletheia/*/controller`.
2. The controller validates the request and delegates business logic to a service in `*/*/service`.
3. The service performs validation, rules, mapping, and repository operations.
4. The repository in `*/*/repository` interacts with the database using Spring Data JPA.
5. Responses are returned as DTOs from `*/*/dto` and wrapped into `common/response/ApiResponse`.

### Primary dependencies and infrastructure

- `pom.xml` defines Spring Boot, Spring Data JPA, Spring Security, Lombok, validation, and database dependencies.
- `WebConfig` configures CORS and general web settings.
- `SecurityConfig` sets up JWT authentication and endpoint authorization.
- `BaseEntity` provides common audit fields for all persisted entities.

## Folder structure and responsibilities

### `auth`
- `AuthController` exposes `/api/auth` endpoints for registration, login, and password change.
- `AuthService` contains authentication business rules, user validation, password encoding, and token generation.
- `UserEntity` stores user identity, credentials, and role.
- `UserRepository` queries user data.
- `Role` defines available roles such as `STUDENT`, `LIBRARIAN`, and `ADMIN`.

### `book`
- `BookController` exposes book CRUD operations and search endpoints.
- `BookService` enforces book-specific rules such as ISBN uniqueness, copy count constraints, and archive logic.
- `BookEntity` stores book metadata and availability state.
- `BookRepository` performs book queries, including search by title/author/isbn.
- DTOs like `CreateBookRequest`, `UpdateBookRequest`, `BookResponse`, and `PaginatedBookResponse` shape request and response payloads.

### `borrow`
- `BorrowController` provides borrow-related endpoints.
- `BorrowService` handles borrowing rules, status management, and history.
- `BorrowRecordEntity` and `BorrowStatus` track borrow lifecycle.
- `BorrowRepository` persists borrow records.

### `reservation`
- `ReservationController` supports reservation endpoints for students.
- `ReservationService` manages reservation creation, status, and retrieval.
- `ReservationEntity` stores reservation details and `ReservationStatus`.
- `ReservationRepository` handles queries.

### `admin`
- `AdminController` exposes admin operations for inventory, dashboard, and user management.
- `AdminService` performs admin business logic separate from standard user flows.
- Admin-specific DTOs represent admin dashboard results, inventory changes, and user data.

### `audit`
- `AuditService` captures audit data for important actions.
- `AuditLogEntity` stores audit records.
- `AuditLogRepository` queries audit history.
- `AuditLogResponse` turns audit records into API-friendly responses.

### `storage`
- `FileStorageService` handles file upload and download operations for cover images and user profile files.

### `security`
- `JwtService` generates and validates JWT tokens.
- `JwtAuthenticationFilter` extracts and verifies the JWT on each request.
- `AuthenticatedUserService` finds the currently authenticated user for logged-in operations.
- `SecurityConfig` configures stateless authentication rules and access control.
- `CorsConfig` sets CORS rules for frontend integration.

### `common`
- `BaseEntity` is a shared superclass for entities with audit fields.
- `ApiResponse<T>` wraps all API responses in a consistent structure.
- Utility controllers may exist for health and validation endpoints.

### `config`
- `JpaConfig` and other configuration classes support persistence and application behavior.

### `exception`
- Custom exceptions such as `ResourceNotFoundException`, `BadRequestException`, and `UnauthorizedException` encapsulate error conditions.
- `GlobalExceptionHandler` translates exceptions into standardized HTTP responses.

### `user`
- `UserService` and `UserController` handle user-related business operations and profile management.
- `ProfileResponse` represents returned user profile data.

## Main connection paths

### Controller -> Service -> Repository

The cleanest pattern in the backend is:

- `*Controller` receives HTTP requests and returns `ApiResponse`.
- `*Service` contains business logic and decides when to query or update the database.
- `*Repository` executes persistence operations.

For example, `BookController.createBook()` calls `BookService.createBook()`, which uses `BookRepository.save()`.

### Security flow

- Requests pass through `JwtAuthenticationFilter`.
- JWT validation happens in `JwtService`.
- `AuthenticatedUserService` exposes the current user inside secured services.
- `SecurityConfig` maps endpoints to roles.

### DTO mapping

- Entities are not returned directly.
- Services map entities to DTOs like `BookResponse`, `AuthResponse`, and `ReservationResponse`.
- This keeps persistence models separate from API contracts.

## How to run

From `Backend/Aletheia`:

```bash
./mvnw spring-boot:run
```

The backend API starts on `http://localhost:8080/api` and serves static uploads from `/uploads`.
