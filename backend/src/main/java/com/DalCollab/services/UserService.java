package com.DalCollab.services;

import com.DalCollab.DTOs.ProjectDTO;
import com.DalCollab.DTOs.UserDTO;
import com.DalCollab.payloads.AuthResponse;
import com.DalCollab.payloads.LoginCredentials;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    AuthResponse registerUser(UserDTO userDTO);
    AuthResponse loginUser(LoginCredentials loginCredentials);
    UserDTO getUser(String email);
    UserDTO update(UserDTO userDTO, MultipartFile profileImage);
    List<String> addSkills(List<String> skills);
    List<String> addInterests(List<String> inerests);
    ProjectDTO updateProject(ProjectDTO projectDTO);
    List<String> getAllEmailsExcept(String email);
}
