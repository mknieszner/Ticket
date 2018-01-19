package ticketproject.app.crud.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.Dto.values.ProjectTableDto;
import ticketproject.app.crud.domain.entities.ProjectTable;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectTableMapper {
  private final RowMapper rowMapper;

  public ProjectTable mapToProjectTable(ProjectTableDto projectTableDto) {
    return new ProjectTable(
        projectTableDto.getId(),
        projectTableDto.getName(),
        rowMapper.mapToRowList(projectTableDto.getRowDtos())
    );
  }

  public ProjectTableDto mapToProjectTableDto(ProjectTable projectTable) {
    return new ProjectTableDto(
        projectTable.getId(),
        projectTable.getName(),
        rowMapper.mapToRowDtos(projectTable.getRows())
    );
  }

  public List<ProjectTableDto> mapToProjectTableDtos(final List<ProjectTable> projectTables) {
    return projectTables
        .stream()
        .map(this::mapToProjectTableDto)
        .collect(Collectors.toList());
  }

  public List<ProjectTable> mapToProjectTables(final List<ProjectTableDto> projectTableDtos) {
    return projectTableDtos
        .stream()
        .map(this::mapToProjectTable)
        .collect(Collectors.toList());
  }
}


