package com.jhy.aletheia.security.service;

import com.jhy.aletheia.auth.entity.UserEntity;

import org.springframework.security.core.Authentication;

import org.springframework.security.core.context
        .SecurityContextHolder;

import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserService { public UserEntity getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return (UserEntity)
                authentication.getPrincipal();
    }
}