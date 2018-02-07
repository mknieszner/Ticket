package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.*;
import ticketproject.app.crud.domain.entities.*;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.mapper.*;
import ticketproject.app.crud.service.dao.UserRepositoryService;

import javax.transaction.Transactional;
import java.util.Collections;
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
  private final UserRepositoryService userRepository;
  private final TaskMapper taskMapper;
  private final TaskRepository taskRepository;

//  public ProjectDto saveProjectDto(final ProjectDto projectDto) {
//    System.out.println("DBSer " + projectDto);
//    Project project = projectMapper.mapToProject(projectDto);
//    System.out.println(project);
//    return projectMapper.mapToProjectDto(projectRepository.save(project));
//  }

  public ProjectDefinitionDto defineProject(final ProjectDefinitionDto projectDefinitionDto) {
    return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.save(definitionMapper.mapProjectDefinitionToProject(projectDefinitionDto)));
  }


  public ProjectDefinitionDto getAllProjectHeaders(final Long projectId) {
    return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.findOne(projectId));
  }

  public ProjectDto getProjectById(final Long projectId) {
    return projectMapper.mapToProjectDto(projectRepository.findOne(projectId));
  }

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

  public RowDto updateRowByTableId(final RowDto rowDto, final Long tableId, final String username) { // TODO: DO USUNIĘCIA tableID - table z row repo
    Row oldRow = rowRepository.findOne(rowDto.getId());
    return rowMapper.mapToRowDto(rowRepository.save(rowMapper.updateRow(oldRow, rowDto, username)));
  }

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

  public List<String> getTablesNamesListAuthorized(final String username) {
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

  public List<TaskDto> addTaskToRowIfAuthorized(final Long rowId, final String username, TaskDto taskDto) {
    Row row = rowRepository.findOne(rowId);
    String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName).anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      row.getTasks().add(taskMapper.mapTaskDtoToTask(taskDto));
      return taskMapper.mapTasksToTaskDtos(rowRepository.save(row).getTasks());
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s TaskDto: %s", username, tableName, taskDto.toString()));
    } // TODO: remove table name from exception (tests)
  }

  public List<TaskDto> getRowsTasksIfAuthirized(final Long rowId, final String username) {
    Row row = rowRepository.findOne(rowId);
    String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName).anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      return taskMapper.mapTasksToTaskDtos(row.getTasks());
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s", username, tableName));
    } // TODO: remove table name from exception (tests)
  }

  public TaskDto assignUserToTaskIfAuthorized(final Long taskId, final String userNameToAssign, final String username) {
    Task task = taskRepository.findOne(taskId);
    final Row row = rowRepository.findByTasksIsContaining(Collections.singletonList(task));
    final String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName).anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      final User userToAssign = userRepository.findByUsername(userNameToAssign);
      task.getUsers().add(userToAssign);
      return taskMapper.mapTaskToTaskDto(taskRepository.save(task));
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s TaskDto: %s", username, tableName, task.toString()));
    } // TODO: remove tablename and task from exception (tests)
  }


  public boolean deleteTask(final Long taskId, final String username) {
    Task task = taskRepository.findOne(taskId);
    Row row = rowRepository.findByTasks(task);
    row.getTasks().remove(task);
    String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName)
        .anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      rowRepository.save(row);
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s TaskDto: %s", username, tableName, task.toString()));
    } // TODO: remove tablename and task from exception (tests)
    return true;
  }

  @Transactional
  public TaskDto updateTaskIfAuthorized(final TaskDto taskDto, final String username) {
    Task taskToUpdate = taskRepository.findOne(taskDto.getId());
    Row row = rowRepository.findByTasks(taskToUpdate);
    String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName)
        .anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      row.setTasks(row.getTasks().stream().map((task) -> {
        if (task.getId().equals(taskDto.getId())) {
          task = taskMapper.mapTaskDtoToTask(taskDto);
        }
        return task;
      }).collect(Collectors.toList()));
      rowRepository.save(row);
      return taskMapper.mapTaskToTaskDto(taskRepository.findOne(taskDto.getId()));
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s TaskDto: %s", username, tableName, taskDto.toString()));
    } // TODO: remove tablename and task from exception (tests)
  }

  public TaskDto removeUserFromTaskIfAuthorized(final Long taskId, final String userNameToAssign, final String username) {
    Task task = taskRepository.findOne(taskId);
    final Row row = rowRepository.findByTasksIsContaining(Collections.singletonList(task));
    final String tableName = row.getProjectTable().getName();
    if (userRepository.findByUsername(username).getRoles() //TODO cache roles???
        .stream()                                          // TODO: validator????
        .map(Role::getName).anyMatch((roleName) -> roleName.equals(tableName) || roleName.equals("ROLE_ADMIN"))) {
      final User userToAssign = userRepository.findByUsername(userNameToAssign);
      task.getUsers().remove(userToAssign);
      return taskMapper.mapTaskToTaskDto(taskRepository.save(task));
    } else {
      throw new RuntimeException(String.format("User:%s does not have authority:%s TaskDto: %s", username, tableName, task.toString()));
    } // TODO: remove tablename and task from exception (tests)
  }
}