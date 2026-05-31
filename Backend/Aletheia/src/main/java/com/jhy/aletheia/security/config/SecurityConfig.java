package com.jhy.aletheia.security.config;

import com.jhy.aletheia.security.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter
            jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain
    securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        /*
                         * PUBLIC ENDPOINTS
                         */

                        .requestMatchers(
                                "/api/auth/**",
                                "/api/health",
                                "/api/books",
                                "/api/books/search",
                                "/api/books/search/**",
                                "/api/books/*",
                                "/uploads/**"
                        ).permitAll()

                        /*
                         * STUDENT FEATURES
                         */

                        .requestMatchers(
                                "/api/borrow/**",
                                "/api/reservations/**"
                        ).hasAnyRole(
                                "STUDENT",
                                "LIBRARIAN",
                                "ADMIN"
                        )

                        /*
                         * ADMIN / LIBRARIAN FEATURES
                         */

                        .requestMatchers(
                                "/api/books/create",
                                "/api/books/update/**",
                                "/api/books/delete/**",
                                "/api/admin/**"
                        ).hasAnyRole(
                                "LIBRARIAN",
                                "ADMIN"
                        )

                        /*
                         * EVERYTHING ELSE
                         */

                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager
    authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }
}