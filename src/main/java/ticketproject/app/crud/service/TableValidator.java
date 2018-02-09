package ticketproject.app.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectRepository;
import ticketproject.app.crud.domain.dto.values.ProjectTableDto;
import ticketproject.app.crud.domain.entities.Project;
import ticketproject.app.crud.domain.entities.ProjectTable;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableValidator {
  private final ProjectRepository projectRepository;
  private final RowValidator rowValidator;

  public void validateTableBeforeUpdate(final Long projectId, final ProjectTableDto projectTableDto) {
    Project project = projectRepository.findOne(projectId);
    validateIfProjectContainsTable(project.getProjectTables(),projectTableDto.getId());
    rowValidator.validateRows(projectTableDto.getId(), projectTableDto.getRowDtos());
  }

  private void validateIfProjectContainsTable(final List<ProjectTable> projectTables, final Long id) {
    checkArgument(projectTables
        .stream()
        .map(ProjectTable::getId)
        .collect(Collectors.toList())
        .contains(id),"Project does not contains the table Id. Id='" + id+'\'');
  }
}
