package com.shopsphere.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    @Autowired
    private Cloudinary cloudinary;

    /**
     * Uploads an image to Cloudinary and returns the secure URL and public ID.
     * Throws RuntimeException if the upload fails — no silent fallback.
     */
    public Map<String, String> uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file provided. Please select an image to upload.");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Invalid file type. Only image files (JPG, PNG, WEBP, etc.) are accepted.");
        }

        // Validate file size (max 10MB)
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("File too large. Maximum allowed size is 10MB.");
        }

        try {
            logger.info("Uploading image to Cloudinary: {} ({}KB)", file.getOriginalFilename(), file.getSize() / 1024);

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "shopsphere/products",
                    "resource_type", "image",
                    "quality", "auto",
                    "fetch_format", "auto"
            ));

            String url = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            logger.info("Image uploaded successfully to Cloudinary. Public ID: {}", publicId);

            Map<String, String> result = new HashMap<>();
            result.put("imageUrl", url);
            result.put("cloudinaryPublicId", publicId);
            return result;

        } catch (IOException e) {
            logger.error("Cloudinary upload failed for file '{}': {}", file.getOriginalFilename(), e.getMessage());
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    /**
     * Deletes an image from Cloudinary by its public ID.
     */
    public boolean deleteImage(String publicId) {
        if (publicId == null || publicId.trim().isEmpty()) {
            return true;
        }
        try {
            Map<?, ?> deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            String result = (String) deleteResult.get("result");
            logger.info("Cloudinary delete result for '{}': {}", publicId, result);
            return "ok".equalsIgnoreCase(result);
        } catch (IOException e) {
            logger.error("Failed to delete image from Cloudinary (publicId={}): {}", publicId, e.getMessage());
            return false;
        }
    }
}
