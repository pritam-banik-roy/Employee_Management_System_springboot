package com.developer.employee_management.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    public S3Service(@Value("${aws.accessKeyId}") String accessKey,
                     @Value("${aws.secretAccessKey}") String secretKey,
                     @Value("${aws.region}") String region) {
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
                .build();
    }

    
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();

        
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType()) 
                .build();

        
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        
        String fileUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;

        return fileUrl;
    }
}
