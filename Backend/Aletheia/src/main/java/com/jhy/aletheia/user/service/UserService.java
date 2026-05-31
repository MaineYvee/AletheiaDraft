package com.jhy.aletheia.user.service;

import com.jhy.aletheia.auth.entity.UserEntity;
import com.jhy.aletheia.auth.repository.UserRepository;
import com.jhy.aletheia.security.service.AuthenticatedUserService;
import com.jhy.aletheia.user.dto.ProfileResponse;
import com.jhy.aletheia.storage.service.FileStorageService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticatedUserService
            authenticatedUserService;

    private final FileStorageService fileStorageService;

    private final UserRepository userRepository;

    public ProfileResponse getProfile() {

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        return ProfileResponse.builder()
                .id(user.getId())
                .studentId(
                        user.getStudentId()
                )
                .firstName(
                        user.getFirstName()
                )
                .lastName(
                        user.getLastName()
                )
                .email(
                        user.getEmail()
                )
                .role(
                        user.getRole().name()
                )
                .profilePictureUrl(
                        user.getProfilePictureUrl()
                )
                .build();
    }

    public void uploadProfilePicture(
            MultipartFile file
    ) {

        UserEntity user =
                authenticatedUserService
                        .getCurrentUser();

        String imageUrl =
                fileStorageService
                        .uploadProfilePicture(file);

        user.setProfilePictureUrl(
                imageUrl
        );

        userRepository.save(user);
    }
}