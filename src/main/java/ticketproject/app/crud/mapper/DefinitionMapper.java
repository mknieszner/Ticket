package ticketproject.app.crud.mapper;

import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.dto.definition.ColumnDetailDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.domain.entities.Project;
import ticketproject.app.crud.domain.entities.ProjectTable;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DefinitionMapper {
  public List<ColumnDetail> mapColumnDefinitionDtoListToColumnDetailList(final List<ColumnDetailDefinitionDto> columnDetailDefinitionDtoList) {
    return columnDetailDefinitionDtoList
        .stream().map(columnDetailDefinitionDto -> new ColumnDetail(
            columnDetailDefinitionDto.getName(),
            columnDetailDefinitionDto.getType(),
            columnDetailDefinitionDto.getOptionList()
        )).collect(Collectors.toList());
  }

  public List<ProjectTable> mapProjectDefinitionToProjectTables(final ProjectDefinitionDto projectDefinitionDto) {
    return projectDefinitionDto.getTableDefinitionDtoList()
        .stream().map(tableDefinitionDto -> new ProjectTable(
            tableDefinitionDto.getName(),
            mapColumnDefinitionDtoListToColumnDetailList(tableDefinitionDto.getColumnDetailDefinitionDtoList())
            )
        ).collect(Collectors.toList());
  }

  public List<TableDefinitionDto> mapProjectTablesToTableDefinitionDtoList(final Project project) {
    return project.getProjectTables()
        .stream()
        .map(this::mapProjectTableToTableDefinitionDto)
        .collect(Collectors.toList());
  }

  public TableDefinitionDto mapProjectTableToTableDefinitionDto(final ProjectTable projectTable) {
    return new TableDefinitionDto(
            projectTable.getId(),
            projectTable.getName(),
            projectTable.getColumnDetails()//columnDetails wstawić tu
                .stream()
                .map(columnDetail -> new ColumnDetailDefinitionDto(
                    columnDetail.getName(),
                    columnDetail.getType(),
                    columnDetail.getOptionList()))
                .collect(Collectors.toList()));
  }

  public ProjectDefinitionDto mapProjectToProjectDefinitionDto(final Project project) {
    return new ProjectDefinitionDto(
        project.getId(),
        project.getName(),
        mapProjectTablesToTableDefinitionDtoList(project)
    );
  }

  public Project mapProjectDefinitionToProject(final ProjectDefinitionDto projectDefinitionDto) {
    return new Project(
        projectDefinitionDto.getId(),
        projectDefinitionDto.getName(),
        mapProjectDefinitionToProjectTables(projectDefinitionDto)
    );
  }
}
