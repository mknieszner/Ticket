package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.Dao.*;
import ticketproject.app.crud.domain.Dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.Dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.Dto.values.ProjectDto;
import ticketproject.app.crud.domain.Dto.values.ProjectTableDto;
import ticketproject.app.crud.domain.Dto.values.RowDto;
import ticketproject.app.crud.domain.Dto.values.RowInfoDto;
import ticketproject.app.crud.domain.entities.*;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.mapper.*;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;


@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableService {
  private final ProjectRepository projectRepository;
  private final ProjectMapper projectMapper;
  private final DefinitionMapper definitionMapper;
  private final ProjectTableRepository projectTableRepository;
  private final RowMapper rowMapper;
  private final RowRepository rowRepository;
  private final ProjectTableMapper projectTableMapper;
  private final RoleRepository roleRepository;
  private final UserRepository userRepository;

//  public ProjectDto saveProjectDto(final ProjectDto projectDto) {
//    System.out.println("DBSer " + projectDto);
//    Project project = projectMapper.mapToProject(projectDto);
//    System.out.println(project);
//    return projectMapper.mapToProjectDto(projectRepository.save(project));
//  }

  public ProjectDefinitionDto defineProject(final ProjectDefinitionDto projectDefinitionDto) {
    return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.save(definitionMapper.mapProjectDefinitionToProject(projectDefinitionDto)));
  }

  //@Cacheable("")
  public ProjectDefinitionDto getAllProjectHeaders(final Long projectId) {
    return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.findOne(projectId));
  }

  public ProjectDto getProjectById(final Long projectId) {
    return projectMapper.mapToProjectDto(projectRepository.findOne(projectId));
  }

  //@CachePut(value="row", key="#result.id")
  public RowDto addRowByTableId(final RowDto rowDto, final Long tableId, final String username) {
    ProjectTable projectTable = projectTableRepository.findOne(tableId);
    Row row = rowMapper.mapToRow(rowDto);
    row.setProjectTable(projectTable);
    row.setCreatedBy(username);
    row.setCreatedOn(new Date());
    row.setLastModifiedBy(username);
    row.setLastModifiedOn(new Date());
    return rowMapper.mapToRowDto(rowRepository.save(row));
  }

  public RowDto getRowByTableIdAndRowId(final Long tableId, final Long rowId) {
    return rowMapper.mapToRowDto(rowRepository.findByProjectTableIdAndId(tableId, rowId));
  }

  public ProjectTableDto getTableValuesById(final Long tableId) {
    return projectTableMapper.mapToProjectTableDto(projectTableRepository.findValuesById(tableId));
  }

  public List<RowDto> getTableRowsByTableId(final Long tableId) {
    System.out.println(tableId);
    List<Row> rows = rowRepository.findAllByProjectTable_Id(tableId);
    System.out.println(rows);
    return rowMapper.mapToRowDtos(rows);
  }

  public List<RowDto> addRowsToTableByTableId(final List<RowDto> rowDtos, final Long tableId, final String username) {
    System.out.println("USERNAME:" + username);
    ProjectTable projectTable = projectTableRepository.findOne(tableId);
    return rowMapper.mapToRowDtos(Lists.newArrayList(rowRepository.save(rowDtos.stream().map(rowMapper::mapToRow).peek(row -> {
      row.setProjectTable(projectTable);
      row.setCreatedBy(username);
      row.setCreatedOn(new Date());
      row.setLastModifiedBy(username);
      row.setLastModifiedOn(new Date());
    }).collect(Collectors.toList()))));
  }

  public RowDto getRowById(final Long rowId) {
    return rowMapper.mapToRowDto(rowRepository.findOne(rowId));

  }

  public ProjectTableDto updateTable(final ProjectTableDto projectTableDto, final Long projectId) {
    Project project = projectRepository.findOne(projectId);
    ProjectTable projectTable = projectTableMapper.mapToProjectTable(projectTableDto);
    projectTable.setProject(project);
    return projectTableMapper.mapToProjectTableDto(projectTableRepository.save(projectTable));
  }

  //@CachePut(value="row", key="#result.id")
  public RowDto updateRowByTableId(final RowDto rowDto, final Long tableId, final String username) { // TODO: DO USUNIĘCIA tableID - table z row repo
    Row oldRow = rowRepository.findOne(rowDto.getId());
    return rowMapper.mapToRowDto(rowRepository.save(rowMapper.updateRow(oldRow, rowDto, username)));
  }

  //@CacheEvict(value = "row", allEntries = true)
  public List<RowDto> updateRowsByTableId(final List<RowDto> rowDtos, final Long tableId) {
    ProjectTable projectTable = projectTableRepository.findOne(tableId);
    return rowMapper.mapToRowDtos(Lists.newArrayList(rowRepository.save(rowDtos.stream().map(rowMapper::mapToRow).peek(row -> row.setProjectTable(projectTable)).collect(Collectors.toList()))));
  }

  public ProjectTableDto addTableByProjectId(final ProjectTableDto projectTableDto, final Long projectId) {
    Project project = projectRepository.findOne(projectId);
    ProjectTable projectTable = projectTableMapper.mapToProjectTable(projectTableDto);
    projectTable.setProject(project);
    return projectTableMapper.mapToProjectTableDto(projectTableRepository.save(projectTable));
  }

  public TableDefinitionDto getTableHeaders(final Long tableId) {
    return definitionMapper.mapProjectTableToTableDefinitionDto(projectTableRepository.findOne(tableId));
  }

  public ProjectDefinitionDto defineSinleTableProject(final TableDefinitionDto tableDefinition) {
    ProjectDefinitionDto projectDefinitionDto = new ProjectDefinitionDto();
    projectDefinitionDto.setName(tableDefinition.getName());
    projectDefinitionDto.getTableDefinitionDtoList().add(tableDefinition);
    Project project = projectRepository.save(definitionMapper.mapProjectDefinitionToProject(projectDefinitionDto));
    System.out.println("przed zmapowaniem do dto" + project);
    return definitionMapper.mapProjectToProjectDefinitionDto(project);
  }

  //@PreAuthorize("hasRole('ADMIN')")
  public void deleteRowById(final Long rowId) {
    rowRepository.delete(rowId);
  }


  @Transactional
  public void deleteTablebyId(final Long tableId) { //TODO:TRANSACTION?
    roleRepository.deleteByName(findTableNameByTableId(tableId));
    projectTableRepository.delete(tableId);
  }

  public void deleteTablebyName(final String tableName) { //TODO:TRANSACTION?
    roleRepository.deleteByName(tableName);
    projectTableRepository.deleteByName(tableName);
  }

  public List<String> getTablesNamesListAuthorized(
      final String username
  ) {
    List<String> tableNames = Lists.newArrayList(projectTableRepository.findAll()).stream().map(ProjectTable::getName).collect(Collectors.toList());

    if (isAdmin(username)) {
      return tableNames;
    } else {
      List<String> userRoleNames = getUsersRoles(username);
      tableNames.retainAll(userRoleNames);
      return tableNames;
    }
  }


  public TableDefinitionDto getTableHeadersByName(final String tableName) {
    return definitionMapper.mapProjectTableToTableDefinitionDto(projectTableRepository.findByName(tableName));
  }


  public List<RowDto> getTableRowsByTableName(final String tableName) {
    System.out.println(tableName);
    List<Row> rows = rowRepository.findAllByProjectTable_Name(tableName);
    System.out.println(rows);
    return rowMapper.mapToRowDtos(rows);
  }


  public Long getTableIdByName(final String tableName) {
    return projectTableRepository.findByName(tableName).getId();
  }

  public String findTableNameByTableId(final Long tableId) {
    return projectTableRepository.findOne(tableId).getName();
  }

  private boolean isAdmin(final String username) {
    return roleRepository.findAllByUsers_Username(username).contains(new Role("ROLE_ADMIN", null));
  }

  private List<String> getUsersRoles(final java.lang.String username) {
    return userRepository.findByUsername(username).getRoles().stream().map(Role::getName).collect(Collectors.toList());
  }

  public RowInfoDto getRowDetailsByRowIdAuthorized(final Long rowId, final String tableName) {
    Row row = rowRepository.findOne(rowId);
    if (row.getProjectTable().getName().equals(tableName)) {
      return rowMapper.mapRowToRowInfoDto(row);
    } else {
      throw new IllegalArgumentException(String.format("Table: %s, does not contains row with ID: %d.", tableName, rowId));
    }
  }
}
