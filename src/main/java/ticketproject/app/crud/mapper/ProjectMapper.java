package ticketproject.app.crud.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.dto.values.ProjectDto;
import ticketproject.app.crud.domain.entities.Project;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectMapper {
  private final ProjectTableMapper projectTableMapper;

  public Project mapToProject(ProjectDto projectDto) {
    Project project = new Project(
        projectDto.getId(),
        projectDto.getName(),
        projectTableMapper.mapToProjectTables(projectDto.getProjectTableDtos())
    );
    return project;
  }

  public ProjectDto mapToProjectDto(Project project) {
    return new ProjectDto(
        project.getId(),
        project.getName(),
        projectTableMapper.mapToProjectTableDtos(project.getProjectTables())
    );
  }
}
