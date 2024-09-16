package com.DalCollab.controllers;

import com.DalCollab.DTOs.ProjectDTO;
import com.DalCollab.DTOs.UserDTO;
import com.DalCollab.payloads.AuthResponse;
import com.DalCollab.services.ProjectService;
import com.DalCollab.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ProjectService projectService;
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me() {


        if(SecurityContextHolder.getContext().getAuthentication() == null){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.builder().message("No user found").build());
        }

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO user = userService.getUser(userName);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(AuthResponse.builder().user(user).message("Success").build());

    }

    @PostMapping("/addproject")
    public ResponseEntity<ProjectDTO> addProject(@Valid @RequestBody ProjectDTO projectDTO){
        projectDTO = projectService.addProject(projectDTO);
        System.out.println(projectDTO.getGithubRepoLink());
        return ResponseEntity.status(HttpStatus.OK).body(projectDTO);
    }

    @DeleteMapping("/deleteproject")
    public ResponseEntity<String> deleteProject(@Valid @RequestBody ProjectDTO projectDTO){
        String response = projectService.deleteProject(projectDTO);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/addskills")
    public ResponseEntity<List<String>> addskills(@Valid @RequestBody List<String> skills){
        skills = userService.addSkills(skills);
        return ResponseEntity.status(HttpStatus.OK).body(skills);
    }

    @PostMapping("/update")
    public ResponseEntity<UserDTO> update(@Valid @ModelAttribute UserDTO userDTO) throws IOException {
        MultipartFile profileImage = userDTO.getProfileImage();
        userDTO = userService.update(userDTO, profileImage);
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }

    @PutMapping("/updateproject")
    public ResponseEntity<ProjectDTO> updateProject(@Valid @RequestBody ProjectDTO projectDTO){
        projectDTO = userService.updateProject(projectDTO);
        return ResponseEntity.status(HttpStatus.OK).body(projectDTO);
    }

    @PutMapping("/addinterests")
    public ResponseEntity<List<String>> addInterests(@Valid @RequestBody List<String> interests){
        interests = userService.addInterests(interests);
        return ResponseEntity.status(HttpStatus.OK).body(interests);
    }

    @GetMapping("/emails")
    public List<String> getAllEmailsExcept(@RequestParam String email) {
        return userService.getAllEmailsExcept(email);
    }
}
