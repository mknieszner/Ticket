package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.*;
import ticketproject.app.crud.service.*;
import ticketproject.app.crud.service.handler.TableRequestHandler;

import java.security.Principal;
import java.util.List;

import static java.util.Optional.ofNullable;
import static ticketproject.app.crud.service.DatabaseEnviroment.SEPARATE_TABLE_ENVIRONMENT;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableController {
    private final TableService tableService;
    private final RowValidator rowValidator;
    private final TableValidator tableValidator;
    private final TableRequestHandler tableRequestHandler;

    @DeleteMapping(value = "projects/tables/rows/tasks/{taskId}")
    public boolean deleteTask(@PathVariable final Long taskId, final Principal principal) {
        return tableService.deleteTask(taskId, principal.getName());
    }


    @PostMapping(value = "projects/tables/rows/tasks/{taskId}")
    public TaskDto assignUserToTask(@PathVariable final Long taskId, @RequestBody final String username) {
        return tableService.assignUserToTask(taskId, username);
    }

    @DeleteMapping(value = "projects/tables/rows/tasks/{taskId}/user/{username}")
    public TaskDto removeUserFromToTask(@PathVariable final Long taskId, @PathVariable final String username) {
        return tableService.removeUserFromTask(taskId, username);
    }

    @PutMapping(value = "projects/tables/rows/tasks/")
    public TaskDto updateTask(@RequestBody final TaskDto taskDto, final Principal principal) {
        return tableService.updateTask(taskDto, principal.getName());
    }

    @PostMapping(value = "projects/tables/rows/{rowId}/tasks")
    public List<TaskDto> addTaskToRow(@PathVariable final Long rowId, @RequestBody final TaskDto taskDto) {
        return tableService.addTaskToRow(rowId, taskDto);
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
    public RowDto addRowByTableName(@PathVariable final String tableName, @RequestBody final RowDto rowDto) {
        return tableRequestHandler.handleAddRowRequest(tableName, rowDto);
    }


    @PutMapping(value = "projects/tables/{tableName}/row")
    public RowDto updateRow(@PathVariable final String tableName, @RequestBody final RowDto rowDto, Principal principal) {
        return tableService.updateRowByTableId(rowDto, tableName, principal.getName());
    }


    @GetMapping(value = "projects/tables/{tableName}/row/{rowId}/details")// TODO REMOVE tableName
    public RowInfoDto getRowDetails(@PathVariable Long rowId, @PathVariable String tableName, final Principal principal) {
        return tableService.getRowDetails(rowId);
    }

    @PostMapping(value = "projects/tables/definition")
    public ProjectDefinitionDto defineProject(@RequestBody final TableDefinitionDto tableDefinitionDto,
                                              @RequestParam(required = false) final DatabaseEnviroment dbEenviroment) {
        return tableRequestHandler.handleTableDefinitionRequest(
                tableDefinitionDto,
                ofNullable(dbEenviroment).orElse(SEPARATE_TABLE_ENVIRONMENT)
        );
    }

    @GetMapping(value = "projects/tables/definition/{tableName}")
    public TableDefinitionDto getTableHeadersByName(@PathVariable final String tableName) {
        return tableService.getTableHeadersByName(tableName);
    }


    @GetMapping(value = "projects/tables/names")
    public List<String> getTablesNamesList(final Principal principal) {
        return tableService.getTablesNamesListAuthorized(principal.getName());
    }

    @GetMapping(value = "projects/tables/{tableName}/rows")
    public List<RowDto> getTableRowsByTableName(@PathVariable final String tableName) {
        return tableRequestHandler.getTableRowsByTableName(tableName);
    }

    @PostMapping(value = "projects/tables/{tableName}/rows")
    public List<RowDto> addRowsToTableByTableName(@RequestBody final List<RowDto> rowDtos, @PathVariable final String tableName, final Principal principal) {
        return tableService.addRowsToTableByTableName(rowDtos, tableName, principal.getName());
    }

    @DeleteMapping(value = "projects/tables/{tableName}/rows/{rowId}")
    public @ResponseBody boolean deleteRowById(@PathVariable final String tableName, @PathVariable final Long rowId ) {
        return tableRequestHandler.handleDeleteRowRequest(tableName, rowId);
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
