package com.jhy.aletheia.auth.service;

import com.jhy.aletheia.auth.dto.AuthResponse;
import com.jhy.aletheia.auth.dto.ChangePasswordRequest;
import com.jhy.aletheia.auth.dto.LoginRequest;
import com.jhy.aletheia.auth.dto.RegisterRequest;
import com.jhy.aletheia.auth.entity.Role;
import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.auth.repository.UserRepository;
import com.jhy.aletheia.exception.BadRequestException;
import com.jhy.aletheia.security.jwt.JwtService;

import com.jhy.aletheia.security.service.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticatedUserService authenticatedUserService;

    public void register(RegisterRequest request) {

        validateUniqueEmail(request.getEmail());

        validateUniqueStudentId(
                request.getStudentId()
        );

        validateNuEmail(request.getEmail());

        UserEntity user = new UserEntity();

        user.setStudentId(request.getStudentId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(Role.STUDENT);

        userRepository.save(user);

        user.setEnabled(true);

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        UserEntity user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(() ->
                        new BadRequestException(
                                "Invalid email or password"
                        )
                );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new BadRequestException(
                    "Invalid email or password"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(
                token,
                user.getRole().name()
        );
    }

    private void validateUniqueEmail(
            String email
    ) {

        if (userRepository.existsByEmail(email)) {

            throw new BadRequestException(
                    "Email already exists"
            );
        }
    }

    private void validateUniqueStudentId(
            String studentId
    ) {

        if (userRepository.existsByStudentId(studentId)) {

            throw new BadRequestException(
                    "Student ID already exists"
            );
        }
    }

    private void validateNuEmail(
            String email
    ) {

        if (!email.endsWith("@students.nu-laguna.edu.ph")) {

            throw new BadRequestException(
                    "Only NU Laguna emails are allowed"
            );
        }
    }

    public void changePassword(
            ChangePasswordRequest request
    ){
        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        if (
                !passwordEncoder.matches(
                        request.getOldPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }

        if (
                passwordEncoder.matches(
                        request.getNewPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "New password must be different"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

    }
}