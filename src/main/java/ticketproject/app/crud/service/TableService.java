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
import java.util.Objects;

import static java.util.stream.Collectors.toList;
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

//    public ProjectDefinitionDto getAllProjectHeaders(final Long projectId) {
//        return definitionMapper.mapProjectToProjectDefinitionDto(projectRepository.findOne(projectId));
//    }
//
//    public ProjectDto getProjectById(final Long projectId) {
//        return projectMapper.mapToProjectDto(projectRepository.findOne(projectId));
//    }


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

//    public RowDto getRowByTableIdAndRowId(final Long tableId, final Long rowId) {
//        return rowMapper.mapToRowDto(rowRepository.findByProjectTableIdAndId(tableId, rowId));
//    }
//
//    public ProjectTableDto getTableValuesById(final Long tableId) {
//        return projectTableMapper.mapToProjectTableDto(projectTableRepository.findValuesById(tableId));
//    }
//
//    public RowDto getRowById(final Long rowId) {
//        return rowMapper.mapToRowDto(rowRepository.findOne(rowId));
//
//    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
//    public List<RowDto> addRowsToTableByTableName(final List<RowDto> rowDtos, final String tableName, final String username) {
//        rowValidator.validateRows(getTableIdByName(tableName), rowDtos);
//        ProjectTable projectTable = projectTableRepository.findByName(tableName);
//        return rowMapper.mapToRowDtos(Lists.newArrayList(
//                rowRepository.save(rowDtos
//                        .stream()
//                        .map(rowMapper::mapToRow)
//                        .peek(row -> {
//                            row.setProjectTable(projectTable);
//                            row.setCreatedBy(username);
//                            row.setCreatedOn(LocalDateTime.now());
//                            row.setLastModifiedBy(username);
//                            row.setLastModifiedOn(LocalDateTime.now());
//                        }).collect(toList()))));
//    }

//    public ProjectTableDto updateTable(final ProjectTableDto projectTableDto, final Long projectId) {
//        Project project = projectRepository.findOne(projectId);
//        ProjectTable projectTable = projectTableMapper.mapToProjectTable(projectTableDto);
//        projectTable.setProject(project);
//        return projectTableMapper.mapToProjectTableDto(projectTableRepository.save(projectTable));
//    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public RowDto updateRowByTableId(final RowDto rowDto, final Long tableId) {
        rowValidator.validateRow(tableId, rowDto);
        Row oldRow = rowRepository.findOne(rowDto.getId());
        return rowMapper.mapToRowDto(rowRepository.save(rowMapper.updateRow(oldRow, rowDto)));
    }

//    public List<RowDto> updateRowsByTableId(final List<RowDto> rowDtos, final Long tableId) {
//        ProjectTable projectTable = projectTableRepository.findOne(tableId);
//        return rowMapper.mapToRowDtos(Lists.newArrayList(rowRepository.save(rowDtos.stream().map(rowMapper::mapToRow).peek(row -> row.setProjectTable(projectTable)).collect(toList()))));
//    }
//
//    public ProjectTableDto addTableByProjectId(final ProjectTableDto projectTableDto, final Long projectId) {
//        Project project = projectRepository.findOne(projectId);
//        ProjectTable projectTable = projectTableMapper.mapToProjectTable(projectTableDto);
//        projectTable.setProject(project);
//        return projectTableMapper.mapToProjectTableDto(projectTableRepository.save(projectTable));
//    }

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
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public void deleteTable(final Long tableId) {
        String tableName = getTableNameBy(tableId);
        projectRepository.delete(tableId);
        roleRepository.deleteByName(tableName);
    }

    public List<TableDetailsDto> getTablesNamesListAuthorized() {
        List<TableDetailsDto> tablesDetails = Lists.newArrayList(projectTableRepository.findAll())
                .stream()
                .map(projectTable -> new TableDetailsDto(projectTable.getId(), projectTable.getName(), projectTable.getProject().getDatabaseEnvironment().name()))
                .collect(toList());

        if (isAdmin(getCurrentUserUsername())) {
            return tablesDetails;
        } else {
            List<String> userRoleNames = getUsersRoles(getCurrentUserUsername());
            return tablesDetails.stream()
                    .filter(tableDetailsDto -> userRoleNames.contains(tableDetailsDto.getName()))
                    .collect(toList());
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
        return userRepository.findByUsername(username).getRoles().stream().map(Role::getName).collect(toList());
    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
//    public RowInfoDto getRowDetails(final Long rowId) {
//        return rowMapper.mapRowToRowInfoDto(rowRepository.findOne(rowId));
//    }

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
        task.getUsers().clear();
        taskRepository.save(task);
        Row row = rowRepository.findByTasks(task);
        row.getTasks().remove(task);
        rowRepository.save(row);
        return true;
    }

    @Transactional
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityBy(#tableId)")
    public TaskDto updateTask(final Long tableId, final TaskDto taskDto) {
        Task task = taskMapper.mapTaskDtoToTask(taskDto);
        Row row = rowRepository.findByTasks(task);
        row.updateTask(task);
        rowRepository.save(row);
        return taskDto;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#taskId)")
    public TaskDto removeUserFromTask(final Long taskId, final String userNameToAssign) {
        Task task = taskRepository.findOne(taskId);
        final User userToAssign = userRepository.findByUsername(userNameToAssign);
        task.getUsers().remove(userToAssign);
        return taskMapper.mapTaskToTaskDto(taskRepository.save(task));
    }

//    private Row updateRowTask(final Row row, final TaskDto newTask) {
//        Task task = taskMapper.mapTaskDtoToTask(newTask);
//        row.updateTask(task);
//        taskRepository.save(task);
//        return row;
//    }

    public List<String> findAllUserCommonTableRoleNames(User user) {
        return user.getRoles().stream()
                .map(role -> projectTableRepository.findByName(role.getName()))
                .filter(Objects::nonNull)
                .filter(projectTable ->
                        DatabaseEnvironment.Environments.COMMON_TABLE_ENVIRONMENT
                                .equals(projectTable.getProject().getDatabaseEnvironment())
                )
                .map(ProjectTable::getName)
                .collect(toList());
    }

    //todo cache??
    public Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }

    public String getTableNameBy(final Long tableId) {
        return projectTableRepository.findOne(tableId).getName();
    }
}