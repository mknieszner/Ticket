package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDetailsDto;
import ticketproject.app.crud.domain.dto.values.*;
import ticketproject.app.crud.domain.entities.Project;
import ticketproject.app.crud.domain.entities.ProjectTable;
import ticketproject.app.crud.domain.entities.Row;
import ticketproject.app.crud.domain.entities.Task;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.mapper.*;
import ticketproject.app.crud.service.dao.UserRepositoryService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
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


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public RowDto addRow(final RowDto rowDto, final Long tableId) {
        return rowMapper.mapToRowDto(rowRepository.save(new Row(
                null,
                "",
                getCurrentUserUsername(),
                LocalDateTime.now(),
                getCurrentUserUsername(),
                LocalDateTime.now(),
                columnValueMapper.mapToTableColumnList(rowDto.getColumnValueDtos()),
                projectTableRepository.findOne(tableId),
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


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public RowDto updateRowByTableId(final RowDto rowDto, final Long tableId) {
        rowValidator.validateRow(tableId, rowDto);
        Row oldRow = rowRepository.findOne(rowDto.getId());
        return rowMapper.mapToRowDto(rowRepository.save(rowMapper.updateRow(oldRow, rowDto)));
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

    public List<TableDetailsDto> getTablesNamesListAuthorized(final String username) {
        List<TableDetailsDto> tablesDetails = Lists.newArrayList(projectTableRepository.findAll())
                .stream()
                .map(projectTable -> new TableDetailsDto(projectTable.getId(), projectTable.getName()))
                .collect(Collectors.toList());

        if (isAdmin(username)) {
            return tablesDetails;
        } else {
            List<String> userRoleNames = getUsersRoles(username);
            return tablesDetails.stream()
                    .filter(tableDetailsDto -> userRoleNames.contains(tableDetailsDto.getName()))
                    .collect(Collectors.toList());
        }
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public TableDefinitionDto getTableHeadersBy(final Long tableId) {
        return definitionMapper.mapProjectTableToTableDefinitionDto(projectTableRepository.findOne(tableId));
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public List<RowDto> getTableRowsBy(final Long tableId) {
        return rowMapper.mapToRowDtos(rowRepository.findAllByProjectTable_Id(tableId));
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
    public TaskDto addTaskToRow(final Long rowId, TaskDto taskDto) {
        Task task = taskMapper.mapTaskDtoToTask(taskDto);
        Row row = rowRepository.findOne(rowId);
        task.setTableId(row.getProjectTable().getId());
        taskRepository.save(task);
        row.getTasks().add(task);
        rowRepository.save(row);
        return taskMapper.mapTaskToTaskDto(task);
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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public boolean deleteTask(final Long taskId, final Long tableId) {
        Task task = taskRepository.findOne(taskId);
        Row row = rowRepository.findByTasks(task);
        row.getTasks().remove(task);
        rowRepository.save(row);
        return true;
    }

    @Transactional
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public TaskDto updateTask(final Long tableId, final TaskDto taskDto) {
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