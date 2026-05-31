package com.jhy.aletheia.storage.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;

import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String uploadBookCover(
            MultipartFile file
    ) {

        validateImage(file);

        try {

            String fileName =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();

            Path uploadPath =
                    Paths.get(
                            uploadDir,
                            "books"
                    );

            Files.createDirectories(uploadPath);

            Path filePath =
                    uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return "/uploads/books/" + fileName;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload file"
            );
        }
    }

    public String uploadProfilePicture(
            MultipartFile file
    ) {

        validateImage(file);

        try {

            String fileName =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();

            Path uploadPath =
                    Paths.get(
                            uploadDir,
                            "profiles"
                    );

            Files.createDirectories(uploadPath);

            Path filePath =
                    uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return "/uploads/profiles/" + fileName;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload file"
            );
        }
    }

    private void validateImage(
            MultipartFile file
    ) {

        if (file.isEmpty()) {

            throw new RuntimeException(
                    "File is empty"
            );
        }

        String contentType =
                file.getContentType();

        if (
                contentType == null
                        ||
                        !contentType.startsWith("image/")
        ) {

            throw new RuntimeException(
                    "Only image files allowed"
            );
        }
    }

    public void deleteFile(
            String fileUrl
    ) {

        try {

            String cleanPath =
                    fileUrl.replace(
                            "/uploads/",
                            ""
                    );

            Path filePath =
                    Paths.get(
                            uploadDir,
                            cleanPath
                    );

            Files.deleteIfExists(filePath);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to delete file"
            );
        }
    }
}