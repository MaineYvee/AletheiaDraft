# AletheiaDraft

## Design Principles and OOP Architecture

This repository is split into two main parts:

- `Backend/Aletheia` — Spring Boot REST API using Java, Spring Data JPA, Spring Security, and a layered architecture.
- `Frontend/aletheia-frontend` — React + TypeScript frontend with reusable components, typed services, and client-side routing.

The project applies core OOP concepts, GRASP principles, SOLID design, and general OOP best practices throughout both backend and frontend layers.

---

## Core OOP Concepts

### Encapsulation
- Backend entities use Lombok `@Getter` and `@Setter` to expose property access in a controlled way.
- `BookEntity`, `UserEntity`, `ReservationEntity`, and other domain entities encapsulate state and are managed through services.
- Controllers such as `BookController`, `AuthController`, and `AdminController` expose only HTTP endpoints and delegate logic to services.

### Abstraction
- Services like `BookService`, `AuthService`, `ReservationService`, and `AuditService` abstract business logic from HTTP transport.
- `ApiResponse<T>` is a reusable response wrapper for consistent API output.
- Frontend services such as `authService.ts`, `bookService.ts`, and `profileService.ts` abstract API calls behind a simple function interface.

### Inheritance
- `BaseEntity` is a mapped superclass that provides common auditing fields (`createdAt`, `updatedAt`) to all JPA entities.
- Domain entities such as `BookEntity` extend `BaseEntity` to reuse common persistence behavior.

### Polymorphism
- Spring dependency injection enables polymorphic wiring of services and components.
- Controllers depend on service interfaces implicitly through concrete Spring beans, allowing behavior to change without affecting controller code.

### Composition
- Controllers compose services and DTOs to implement request handling.
- `BookService` composes `BookRepository` and uses helper methods like `mapToResponse` to produce DTOs.
- Frontend pages compose reusable components such as `Sidebar`, `AdminSidebar`, `BookForm`, and `DashboardCard`.

---

## GRASP Principles

### Controller
- `BookController`, `AuthController`, `ReservationController`, `BorrowController`, `AdminController`, and `UserController` act as controllers that receive HTTP requests and delegate responsibilities.

### Creator
- `AuthService.register()` creates a new `UserEntity`.
- `BookService.createBook()` builds a new `BookEntity`.
- `AuditService` and other service classes create DTO responses and manage domain object creation.

### Information Expert
- Services own the logic for domain-specific operations.
  - `BookService` validates ISBN uniqueness, enforces copy counts, and maps entities to `BookResponse`.
  - `AuthService` manages password encoding, login verification, and email domain validation.

### Low Coupling
- Each controller depends only on its corresponding service, not on repositories or implementation details.
- Repositories such as `BookRepository`, `UserRepository`, and `ReservationRepository` isolate persistence.
- The frontend uses centralized API client `src/api/axios.ts` so pages and components do not duplicate Axios configuration.

### High Cohesion
- Each class has a narrow focus:
  - Controllers handle request/response flow.
  - Services handle business rules.
  - Repositories handle data access.
  - DTOs carry structured data.

### Pure Fabrication
- `ApiResponse<T>` is a fabricated helper for consistent API payloads.
- `ProtectedRoute.tsx` is a fabricated routing guard to protect authenticated routes without polluting page components.

### Indirection
- `AuthenticatedUserService` separates current-user lookup logic away from controllers and business services.
- `JwtService` centralizes JWT generation and validation.

### Protected Variations
- JWT authentication is implemented in a way that isolates token logic from controllers using `JwtAuthenticationFilter` and `apiClient` interceptor.
- Frontend route protection is abstracted through `ProtectedRoute`.

---

## SOLID Principles

### Single Responsibility Principle (SRP)
- Controllers have one responsibility: HTTP endpoint handling.
- Services have one responsibility: business rules and validation.
- Repositories have one responsibility: database access.
- DTOs have one responsibility: carrying structured data.
- `GlobalExceptionHandler` centralizes error handling separately from business logic.

### Open/Closed Principle (OCP)
- New endpoints can be added by introducing new controller methods and service methods without modifying unrelated classes.
- `Role` values and authorization behaviors can be extended without changing basic controller logic.
- Search methods in `BookService` are implemented as separate operations, keeping existing methods stable.

### Liskov Substitution Principle (LSP)
- The design avoids violating substitutability by keeping service and controller contracts stable.
- DTO builders and entity-to-response mapping functions preserve object expectations across layers.

### Interface Segregation Principle (ISP)
- Frontend service modules expose small, focused function sets instead of one large API object.
- Backend controllers are segregated by resource domain (`auth`, `books`, `reservations`, `borrow`, `admin`).

### Dependency Inversion Principle (DIP)
- Backend dependencies are injected through constructors using Spring `@RequiredArgsConstructor`.
- Controllers depend on abstractions expressed by service APIs rather than concrete persistence logic.
- Frontend `apiClient` centralizes Axios dependency injection and HTTP header management.

---

## OOP Best Practices Used

### Layered Architecture
- Backend layers:
  - `controller` — handles API endpoints.
  - `service` — implements business rules.
  - `repository` — data persistence and query methods.
  - `entity` / `dto` — domain models and request/response models.

### Separation of Concerns
- Authentication is separated into `AuthController`, `AuthService`, `JwtService`, and security config classes.
- Administration flows are separated under `admin/` packages.
- Frontend pages separate UI composition from API interaction.

### Reusability and Maintainability
- DTOs are reused across controllers and services.
- `ApiResponse<T>` enforces a consistent API contract.
- Shared frontend components like `Sidebar` and `DashboardCard` are reused throughout pages.

### Error Handling
- Custom exceptions such as `ResourceNotFoundException`, `BadRequestException`, and `UnauthorizedException` centralize failure modes.
- `GlobalExceptionHandler` formats exceptions consistently for API consumers.

### Validation and Data Safety
- Backend request validation uses `@Valid` and DTOs with field restrictions.
- Authentication checks and business validations are kept in service layer.
- Frontend TypeScript interfaces such as `Book`, `User`, `Profile`, and `AuditLog` provide compile-time type safety.

### Configuration and Infrastructure
- `WebConfig`, `SecurityConfig`, and `JpaConfig` keep framework setup separate from business logic.
- `apiClient` configures Axios once and applies auth headers automatically.

---

## Where the Principles Are Used

### Backend Examples
- `Backend/Aletheia/src/main/java/com/jhy/aletheia/book/service/BookService.java`
  - Enforces business rules and keeps controllers thin.
  - Validates ISBN uniqueness and copy constraints.
  - Maps entities to DTOs.

- `Backend/Aletheia/src/main/java/com/jhy/aletheia/common/entity/BaseEntity.java`
  - Reuses common audit fields across entities using inheritance.

- `Backend/Aletheia/src/main/java/com/jhy/aletheia/auth/service/AuthService.java`
  - Handles user creation, login logic, password encryption, and domain validation.

- `Backend/Aletheia/src/main/java/com/jhy/aletheia/common/response/ApiResponse.java`
  - Standardizes response structure across endpoints.

- `Backend/Aletheia/src/main/java/com/jhy/aletheia/security/jwt/JwtAuthenticationFilter.java`
  - Protects variations in authentication by centralizing JWT validation logic.

- `Backend/Aletheia/src/main/java/com/jhy/aletheia/exception/GlobalExceptionHandler.java`
  - Keeps error mapping separate from business rules.

### Frontend Examples
- `Frontend/aletheia-frontend/src/api/axios.ts`
  - Centralizes HTTP client configuration and Authorization header injection.

- `Frontend/aletheia-frontend/src/routes/ProtectedRoute.tsx`
  - Implements route protection with a reusable component.

- `Frontend/aletheia-frontend/src/services/authService.ts`
  - Encapsulates auth API calls behind typed interfaces.

- `Frontend/aletheia-frontend/src/components/BookForm.tsx`
  - Encapsulates form rendering and reuse across create/edit book flows.

- `Frontend/aletheia-frontend/src/App.tsx`
  - Keeps routing configuration separate from page components and protects authenticated routes with composition.

---

## Summary

This project demonstrates practical use of OOP design in a full-stack application:
- Domain-driven entities and DTOs on the backend.
- Well-separated controller, service, and repository layers.
- Centralized authentication, validation, and error handling.
- Typed frontend service layer, reusable UI components, and protected routing.
- Clear alignment with GRASP, SOLID, and general object-oriented best practices.

If you want, I can also add a shorter developer-facing architecture section to the README describing the main packages and how they interact.