package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.*;
import ticketproject.app.crud.service.*;

import java.security.Principal;
import java.util.List;

import static com.google.common.base.Preconditions.checkArgument;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableController {
  private final TableService tableService;
  private final UserService userService;
  private final RowValidator rowValidator;
  private final TableValidator tableValidator;

  @DeleteMapping(value = "projects/tables/rows/tasks/{taskId}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskId)")
  public boolean deleteTask(@PathVariable final Long taskId, final Principal principal) {
    return tableService.deleteTask(taskId,principal.getName());
  }

  @PostMapping(value = "projects/tables/rows/tasks/{taskId}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskId)")
  public TaskDto assignUserToTask(@PathVariable final Long taskId, @RequestBody final String username, final Principal principal) {
    return tableService.assignUserToTaskIfAuthorized(taskId,username,principal.getName());
  }

  @DeleteMapping(value = "projects/tables/rows/tasks/{taskId}/user/{username}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#taskId)")
  public TaskDto removeUserFromToTask(@PathVariable final Long taskId, @PathVariable final String username, final Principal principal) {
    return tableService.removeUserFromTaskIfAuthorized(taskId,username,principal.getName());
  }

  @PutMapping(value = "projects/tables/rows/tasks/")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTaskId(#taskDto.id)")
  public TaskDto updateTask(@RequestBody final TaskDto taskDto, final Principal principal) {
    return tableService.updateTaskIfAuthorized(taskDto,principal.getName());
  }

  @PostMapping(value = "projects/tables/rows/{rowId}/tasks")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
  public List<TaskDto> addTaskToRow(@PathVariable final Long rowId, @RequestBody final TaskDto taskDto, final Principal principal) {
    return tableService.addTaskToRowIfAuthorized(rowId,principal.getName(),taskDto);
  }

  @GetMapping(value = "projects/tables/rows/{rowId}/tasks/")
  public List<TaskDto> getRowsTasks(@PathVariable final Long rowId, final Principal principal) {
    return tableService.getRowsTasks(rowId);
  }

  @DeleteMapping(value = "projects/tables/{tableName}")
  public void deleteTableByName(@PathVariable final String tableName) {
    tableService.deleteTablebyName(tableName);
  }

  @PostMapping(value = "projects/tables/{tableName}/row")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') && @tableAccessManager.hasTableAccessAuthorityByTaskId(#tableName)")
  public RowDto addRowByTableName(@PathVariable final String tableName, @RequestBody final RowDto rowDto, final Principal principal) {
    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRow(tableId, rowDto);
    return tableService.addRowByTableId(rowDto, tableId, principal.getName());
  }


  @PutMapping(value = "projects/tables/{tableName}/row")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
  public RowDto updateRow(@PathVariable final String tableName, @RequestBody final RowDto rowDto, Principal principal) {

    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRow(tableId, rowDto);
    return tableService.updateRowByTableId(rowDto, tableId, principal.getName());
  }


  @GetMapping(value = "projects/tables/{tableName}/row/{taskId}/details")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
  public RowInfoDto getRowDetails(@PathVariable Long taskId, @PathVariable String tableName, final  Principal principal) {
    return tableService.getRowDetailsByRowIdAuthorized(taskId, tableName);
  }

  @PostMapping(value = "projects/tables/definition")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableDefinitionDto.name)")
  public ProjectDefinitionDto defineProject(@RequestBody final TableDefinitionDto tableDefinitionDto) { // TODO dbService.saveRuleNames(projectDefinitionDto.getTableDefinitionDtoList());
    userService.saveRuleNames(tableDefinitionDto);
    return tableService.defineSinleTableProject(tableDefinitionDto);
  }

  @GetMapping(value = "projects/tables/definition/{tableName}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
  public TableDefinitionDto getTableHeadersByName(@PathVariable final String tableName) {
    return tableService.getTableHeadersByName(tableName);
  }


  @GetMapping(value = "projects/tables/names")
  public List<String> getTablesNamesList(final Principal principal) {
    System.out.println(principal.getName());
    return tableService.getTablesNamesListAuthorized(principal.getName());
  }

  @GetMapping(value = "projects/tables/{tableName}/rows")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
  public List<RowDto> getTableRowsByTableName(@PathVariable final String tableName) {
    return tableService.getTableRowsByTableName(tableName);
  }

  @PostMapping(value = "projects/tables/{tableName}/rows")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByTableName(#tableName)")
  public List<RowDto> addRowsToTableByTableId(@RequestBody final List<RowDto> rowDtos, @PathVariable final String tableName, final Principal principal) {
    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRows(tableId, rowDtos);
    return tableService.addRowsToTableByTableId(rowDtos, tableId, principal.getName());
  }

  @DeleteMapping(value = "projects/tables/rows/{rowId}") // TODO: DO ZAMIANY NA TABLE NAME I ROWID Z REQUEST BODY
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || @tableAccessManager.hasTableAccessAuthorityByRowId(#rowId)")
  public @ResponseBody boolean deleteRowById(@PathVariable final Long rowId) {
    tableService.deleteRowById(rowId);
    return true;
  }


//  @PostMapping(value = "projects/definition")
//  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//  public ProjectDefinitionDto defineProject(@RequestBody final ProjectDefinitionDto projectDefinitionDto) {
//    userService.saveRuleNames(projectDefinitionDto.getTableDefinitionDtoList());
//    return tableService.defineProject(projectDefinitionDto);
//  }

  //TODO: DO USUNIĘCIA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @GetMapping(value = "projects/{projectId}")
  public ProjectDto getProjectById(@PathVariable final Long projectId) {
    return tableService.getProjectById(projectId);
  }

  @GetMapping(value = "projects/tables/rows/{rowId}")
  public RowDto getRowById(@PathVariable final Long rowId) {
    return tableService.getRowById(rowId);
  }

  @GetMapping(value = "projects/tables/{tableId}")
  public ProjectTableDto getTableValuesById(@PathVariable final Long tableId) {
    return tableService.getTableValuesById(tableId);
  }

  @PutMapping(value = "projects/tables/{tableId}/rows")//, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public List<RowDto> updateRowsByTableId(@RequestBody final List<RowDto> rowDtos, @PathVariable final Long tableId) {
    rowValidator.validateRows(tableId, rowDtos);
    return tableService.updateRowsByTableId(rowDtos, tableId);
  }

  @PostMapping(value = "projects/{projectId}/tables")//, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public ProjectTableDto addTableByProjectId(@RequestBody final ProjectTableDto projectTableDto, @PathVariable final Long projectId) {
    return tableService.addTableByProjectId(projectTableDto, projectId);
  }

  @PutMapping(value = "projects/{projectId}/tables")//, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public ProjectTableDto updateTable(@RequestBody final ProjectTableDto projectTableDto, @PathVariable final Long projectId) {
    tableValidator.validateTableBeforeUpdate(projectId, projectTableDto);
    return tableService.updateTable(projectTableDto, projectId);
  }

  @GetMapping(value = "projects/definition/{projectId}")
  public ProjectDefinitionDto getAllProjectHeaders(@PathVariable final Long projectId) {
    return tableService.getAllProjectHeaders(projectId);
  }
}
