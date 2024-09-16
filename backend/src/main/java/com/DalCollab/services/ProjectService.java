package com.DalCollab.services;

import com.DalCollab.DTOs.ProjectDTO;

import java.util.List;

public interface ProjectService {

    ProjectDTO addProject(ProjectDTO projectDTO);

    String deleteProject(ProjectDTO projectDTO);
    List<ProjectDTO> getAllProjects();
}
