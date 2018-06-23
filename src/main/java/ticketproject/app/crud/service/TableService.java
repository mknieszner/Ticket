package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static ticketproject.app.crud.service.UserService.getCurrentUserUsername;


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
    private final RowValidator rowValidator;

    private final ColumnValueMapper columnValueMapper;

//  public ProjectDto saveProjectDto(final ProjectDto projectDto) {
//    System.out.println("DBSer " + projectDto);
//    Project project = projectMapper.mapToProject(projectDto);
//    System.out.println(project);
//    return projectMapper.mapToProjectDto(projectRepository.save(project));
//  }

//  public ProjectDefinitionDto defineProject(final ProjectDefinitionDto projectDefinitionDto) {
//    return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.save(definitionMapper.mapProjectDefinitionToProject(projectDefinitionDto)));
//  }


    public ProjectDefinitionDto getAllProjectHeaders(final Long projectId) {
        return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.findOne(projectId));
    }

    public ProjectDto getProjectById(final Long projectId) {
        return projectMapper.mapToProjectDto(projectRepository.findOne(projectId));
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#tableName)")
    public RowDto addRow(final RowDto rowDto, final String tableName) {
        return rowMapper.mapToRowDto(rowRepository.save(new Row(
                null,
                "",
                getCurrentUserUsername(),
                LocalDateTime.now(),
                getCurrentUserUsername(),
                LocalDateTime.now(),
                columnValueMapper.mapToTableColumnList(rowDto.getColumnValueDtos()),
                projectTableRepository.findByName(tableName),
                taskMapper.mapTaskDtosToTasks(rowDto.getTaskDtos()))));
    }

    public RowDto getRowByTableIdAndRowId(final Long tableId, final Long rowId) {
        return rowMapper.mapToRowDto(rowRepository.findByProjectTableIdAndId(tableId, rowId));
    }

    public ProjectTableDto getTableValuesById(final Long tableId) {
        return projectTableMapper.mapToProjectTableDto(projectTableRepository.findValuesById(tableId));
    }

//    public List<RowDto> getTableRowsByTableId(final Long tableId) {
//        System.out.println(tableId);
//        List<Row> rows = rowRepository.findAllByProjectTable_Id(tableId);
//        System.out.println(rows);
//        return rowMapper.mapToRowDtos(rows);
//    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
    public List<RowDto> addRowsToTableByTableName(final List<RowDto> rowDtos, final String tableName, final String username) {
        rowValidator.validateRows(getTableIdByName(tableName), rowDtos);
        ProjectTable projectTable = projectTableRepository.findByName(tableName);
        return rowMapper.mapToRowDtos(Lists.newArrayList(
                rowRepository.save(rowDtos
                        .stream()
                        .map(rowMapper::mapToRow)
                        .peek(row -> {
                            row.setProjectTable(projectTable);
                            row.setCreatedBy(username);
                            row.setCreatedOn(LocalDateTime.now());
                            row.setLastModifiedBy(username);
                            row.setLastModifiedOn(LocalDateTime.now());
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


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
    public RowDto updateRowByTableId(final RowDto rowDto, final String tableName, final String username) {
        rowValidator.validateRow(getTableIdByName(tableName), rowDto);
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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableDefinitionDto.name)")
    public ProjectDefinitionDto defineSingleTableProject(final TableDefinitionDto tableDefinitionDto,
                                                         final DatabaseEnvironment.Environments databaseEnvironment) {
        return definitionMapper.mapProjectToProjectDefinitionDto(
                projectRepository.save(
                        definitionMapper.mapProjectDefinitionToProject(
                                new ProjectDefinitionDto(
                                        null,
                                        tableDefinitionDto.getName(),
                                        Lists.newArrayList(tableDefinitionDto)
                                ),
                                databaseEnvironment)
                )
        );
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
    public void deleteRowById(final Long rowId) {
        rowRepository.delete(rowId);
    }

    @Transactional
    public void deleteTablebyId(final Long tableId) { //TODO:TRANSACTION?
        roleRepository.deleteByName(getTableNameById(tableId));
        projectTableRepository.delete(tableId);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
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


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
    public TableDefinitionDto getTableHeadersByName(final String tableName) {
        return definitionMapper.mapProjectTableToTableDefinitionDto(projectTableRepository.findByName(tableName));
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
    public List<RowDto> getTableRowsByTableName(final String tableName) {
        return rowMapper.mapToRowDtos(rowRepository.findAllByProjectTable_Name(tableName));
    }

    private boolean isAdmin(final String username) {
        return roleRepository.findAllByUsers_Username(username).contains(new Role("ROLE_ADMIN", null));
    }

    private List<String> getUsersRoles(final java.lang.String username) {
        return userRepository.findByUsername(username).getRoles().stream().map(Role::getName).collect(Collectors.toList());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
    public RowInfoDto getRowDetails(final Long rowId) {
        return rowMapper.mapRowToRowInfoDto(rowRepository.findOne(rowId));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
    public List<TaskDto> addTaskToRow(final Long rowId, TaskDto taskDto) {
        Row row = rowRepository.findOne(rowId);
        row.getTasks().add(taskMapper.mapTaskDtoToTask(taskDto));
        return taskMapper.mapTasksToTaskDtos(rowRepository.save(row).getTasks());
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
    public List<TaskDto> getRowsTasks(final Long rowId) {
        return taskMapper.mapTasksToTaskDtos(rowRepository.findOne(rowId).getTasks());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskId)")
    public TaskDto assignUserToTask(final Long taskId, final String userNameToAssign) {
        Task task = taskRepository.findOne(taskId);
        final User userToAssign = userRepository.findByUsername(userNameToAssign);
        task.getUsers().add(userToAssign);
        return taskMapper.mapTaskToTaskDto(taskRepository.save(task));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskId)")
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
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskDto.id)")
    public TaskDto updateTask(final TaskDto taskDto, final String username) {
        rowRepository.save(updateRowTask(rowRepository.findByTasks(taskRepository.findOne(taskDto.getId())), taskDto));
        //return taskMapper.mapTaskToTaskDto(taskRepository.findOne(taskDto.getId()));
        return taskDto;// TODO return whatttt???
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#taskId)")
    public TaskDto removeUserFromTask(final Long taskId, final String userNameToAssign) {
        Task task = taskRepository.findOne(taskId);
        final User userToAssign = userRepository.findByUsername(userNameToAssign);
        task.getUsers().remove(userToAssign);
        return taskMapper.mapTaskToTaskDto(taskRepository.save(task));
    }

    private Row updateRowTask(final Row row, final TaskDto newTask) {
        row.setTasks(row.getTasks()
                .stream()
                .map(
                        (task) -> {
                            if (task.getId().equals(newTask.getId())) {
                                task = taskMapper.mapTaskDtoToTask(newTask);
                            }
                            return task;
                        })
                .collect(Collectors.toList()));
        return row;
    }

    //todo cache??
    public Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }

    private String getTableNameById(final Long tableId) {
        return projectTableRepository.findOne(tableId).getName();
    }
}