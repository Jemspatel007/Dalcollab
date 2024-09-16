package com.DalCollab.services;

import com.DalCollab.DTOs.ProjectDTO;
import com.DalCollab.DTOs.UserDTO;
import com.DalCollab.entities.Project;
import com.DalCollab.entities.User;
import com.DalCollab.exception.APIException;
import com.DalCollab.payloads.AuthResponse;
import com.DalCollab.payloads.LoginCredentials;
import com.DalCollab.repositories.ProjectRepo;
import com.DalCollab.repositories.UserRepo;
import com.DalCollab.security.JWTConfig;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
//import software.amazon.awssdk.services.s3.S3Client;
//import software.amazon.awssdk.services.s3.model.PutObjectRequest;
//import software.amazon.awssdk.services.sns.SnsClient;
//import software.amazon.awssdk.services.sns.model.SubscribeRequest;
import java.util.stream.Collectors;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final ProjectRepo projectRepo;
    private final ModelMapper modelMapper;
    private final JWTConfig jwtConfig;
    private final AuthenticationManager authenticationManager;
//    private final S3Client s3Client;
//    private final SnsClient snsClient;
//    @Value("${aws.bucketName}")
//    private String bucket;
//
//    @Value("${aws.snsArn}")
//    private String topicArn;

    @Override
    public AuthResponse registerUser(UserDTO userDTO) {

        try{
            User user = modelMapper.map(userDTO, User.class);

            User registeredUser = userRepo.save(user);


            String accessToken = jwtConfig.generateToken(registeredUser);
            String refreshToken = jwtConfig.generateRefreshToken(registeredUser);

            userDTO = modelMapper.map(registeredUser, UserDTO.class);
            userDTO.setPassword(null);

////            String topicArn = "arn:aws:sns:us-east-1:297323627892:dalcollab-topic";
//            SubscribeRequest subscribeRequest = SubscribeRequest.builder()
//                    .topicArn(topicArn)
//                    .protocol("email")
//                    .endpoint(userDTO.getEmail())
//                    .build();
//            snsClient.subscribe(subscribeRequest);

            return AuthResponse.builder()
                    .user(userDTO)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

        } catch (DataIntegrityViolationException e){
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }catch(ConstraintViolationException e){
            throw new APIException(e.getConstraintViolations().toString());
        }catch(Exception e){
            throw new RuntimeException("Internal server Error");
        }
    }

    @Override
    public AuthResponse loginUser(LoginCredentials credentials) {

        UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword());
        authenticationManager.authenticate(authCredentials);

        User user = userRepo.findByEmail(credentials.getEmail());
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword(null);

        String accessToken = jwtConfig.generateToken(user);
        String refreshToken = jwtConfig.generateRefreshToken(user);

        return AuthResponse.builder()
                .user(userDTO)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .message("Logged in successfully")
                .build();
    }

    @Override
    public UserDTO getUser(String email) {
        try{
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepo.findByEmail(userName);
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);
            userDTO.setPassword(null);
            System.out.println(userDTO.getUserName());
            return userDTO;
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public UserDTO update(UserDTO userDTO, MultipartFile profileImage) {
        try {
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                throw new Exception("User not found");
            }

            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepo.findByEmail(userName);

            user.setUserName(userDTO.getUserName());
            user.setBio(userDTO.getBio());
            user.setTagline(userDTO.getTagline());
            user.setMobileNumber(userDTO.getMobileNumber());

            if (profileImage != null && !profileImage.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + ".png";
                Path tempFile = Files.createTempFile("temp", fileName);

                profileImage.transferTo(tempFile.toFile());

//                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                        .bucket(bucket)
//                        .key(fileName)
//                        .contentType("image/png") // Set content type as image/png
//                        .build();
//
//                s3Client.putObject(putObjectRequest, tempFile);

                Files.delete(tempFile);

                String s3Url = "https://jemsimage.s3.amazonaws.com/" + fileName;
                user.setProfileImageUrl(s3Url);
            }

            userRepo.save(user);

            userDTO = modelMapper.map(user, UserDTO.class);
            userDTO.setPassword(null);
            return userDTO;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public List<String> addSkills(List<String> skills) {

        try {

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                throw new Exception("User not found");
            }

            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepo.findByEmail(userName);

            user.setSkills(skills);

            User savedUser = userRepo.save(user);

            return savedUser.getSkills();

        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<String> addInterests(List<String> inerests) {
        try{

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                throw new Exception("User not found");
            }

            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepo.findByEmail(userName);

            user.setInterests(inerests);

            User savedUser = userRepo.save(user);

            return savedUser.getInterests();

        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        try{

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                throw new Exception("User not found");
            }

            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepo.findByEmail(userName);

            Project project = projectRepo.findById(projectDTO.getId())
                    .orElseThrow(() -> new Exception("Project not found"));

            project.setName(projectDTO.getName());
            project.setDeveloper(projectDTO.getDeveloper());
            project.setDescription(projectDTO.getDescription());
            project.setTags(projectDTO.getTags());
            project.setDeveloper(user);

            Project updatedproject = projectRepo.save(project);


            projectDTO = modelMapper.map(updatedproject, ProjectDTO.class);

            return projectDTO;

        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<String> getAllEmailsExcept(String email) {
        List<User> users = userRepo.findAll();
        return users.stream()
                .filter(user -> !user.getEmail().equalsIgnoreCase(email))
                .map(User::getEmail)
                .collect(Collectors.toList());
    }
}
