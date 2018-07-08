package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDetailsDto;
import ticketproject.app.crud.domain.dto.values.*;
import ticketproject.app.crud.service.DatabaseEnvironment;
import ticketproject.app.crud.service.RowValidator;
import ticketproject.app.crud.service.TableService;
import ticketproject.app.crud.service.TableValidator;

import java.security.Principal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class TableController {
    private final TableService tableService;
    private final RowValidator rowValidator;
    private final TableValidator tableValidator;
    private final DatabaseEnvironment databaseEnvironment;


    @DeleteMapping(value = "projects/tables/{tableId}/rows/tasks/{taskId}")
    public boolean deleteTask(@PathVariable final Long tableId, @PathVariable final Long taskId) {
        return databaseEnvironment.getHandlerBy(tableId).deleteTask(tableId, taskId);
    }

    @PostMapping(value = "projects/tables/{tableId}/rows/tasks/{taskId}")
    public TaskDto assignUserToTask(@PathVariable final Long tableId, @PathVariable final Long taskId, @RequestBody final String username) {
        return databaseEnvironment.getHandlerBy(tableId).assignUserToTask(tableId, taskId, username);
    }

    @DeleteMapping(value = "projects/tables/{tableId}/rows/tasks/{taskId}/user/{username}")
    public TaskDto removeUserFromToTask(@PathVariable final Long taskId, @PathVariable Long tableId, @PathVariable final String username) {
        return databaseEnvironment.getHandlerBy(tableId).removeUserFromTask(tableId, taskId, username);
    }

    @PutMapping(value = "projects/tables/{tableId}/rows/tasks")
    public TaskDto updateTask(@PathVariable Long tableId, @RequestBody final TaskDto taskDto) {
        return databaseEnvironment.getHandlerBy(tableId).updateTask(tableId, taskDto);
    }

    @PostMapping(value = "projects/tables/{tableId}/rows/{rowId}/tasks")
    public TaskDto addTaskToRow(@PathVariable Long tableId, @PathVariable final Long rowId, @RequestBody final TaskDto taskDto) {
        return databaseEnvironment.getHandlerBy(tableId).addTaskToRow(tableId, rowId, taskDto);
    }

    @GetMapping(value = "projects/tables/rows/{rowId}/tasks/")
    public List<TaskDto> getRowsTasks(@PathVariable final Long rowId, final Principal principal) {
        return tableService.getRowsTasks(rowId);
    }

    @DeleteMapping(value = "projects/tables/{tableName}")
    public void deleteTableByName(@PathVariable final String tableName) {
        tableService.deleteTablebyName(tableName);
    }

    @PostMapping(value = "projects/tables/{tableId}/row")
    public RowDto addRow(@PathVariable final Long tableId, @RequestBody final RowDto rowDto) {
        return databaseEnvironment.getHandlerBy(tableId).handleAddRowRequest(tableId, rowDto);
    }


    @PutMapping(value = "projects/tables/{tableId}/row")
    public RowDto updateRow(@PathVariable final Long tableId, @RequestBody final RowDto rowDto) {
        return databaseEnvironment.getHandlerBy(tableId).updateRowByTableId(rowDto, tableId);
    }


    @GetMapping(value = "projects/tables/{tableName}/row/{rowId}/details")// TODO REMOVE tableName
    public RowInfoDto getRowDetails(@PathVariable Long rowId, @PathVariable String tableName, final Principal principal) {
        return tableService.getRowDetails(rowId);
    }

    @PostMapping(value = "projects/tables/definition/{dbEnvironment}")
    public ProjectDefinitionDto defineProject(@RequestBody final TableDefinitionDto tableDefinitionDto,
                                              @PathVariable DatabaseEnvironment.Environments dbEnvironment) {
        return databaseEnvironment.getHandlerBy(dbEnvironment).handleTableDefinitionRequest(tableDefinitionDto, dbEnvironment);
    }

    @GetMapping(value = "projects/tables/{tableId}/definition")
    public TableDefinitionDto getTableHeaders(@PathVariable final Long tableId) {
        return tableService.getTableHeadersBy(tableId);
    }


    @GetMapping(value = "projects/tables/names")
    public List<TableDetailsDto> getTablesNamesList(final Principal principal) {
        return tableService.getTablesNamesListAuthorized(principal.getName());
    }

    @GetMapping(value = "projects/tables/{tableId}/rows")
    public List<RowDto> getTableRows(@PathVariable final Long tableId) {
        return databaseEnvironment.getHandlerBy(tableId).getTableRowsBy(tableId);
    }

    @PostMapping(value = "projects/tables/{tableName}/rows")
    public List<RowDto> addRowsToTable(@RequestBody final List<RowDto> rowDtos, @PathVariable final String tableName, final Principal principal) {
        return tableService.addRowsToTableByTableName(rowDtos, tableName, principal.getName());
    }

    @DeleteMapping(value = "projects/tables/{tableId}/rows/{rowId}")
    public @ResponseBody
    boolean deleteRowById(@PathVariable final Long tableId, @PathVariable final Long rowId) {
        return databaseEnvironment.getHandlerBy(tableId).handleDeleteRowRequest(tableId, rowId);
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
