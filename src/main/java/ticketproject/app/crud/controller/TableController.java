package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDetailsDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.service.DatabaseEnvironment;
import ticketproject.app.crud.service.TableService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class TableController {
    private final TableService tableService;
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

    @DeleteMapping(value = "projects/{tableId}")
    public boolean deleteTable(@PathVariable final Long tableId) {
        return databaseEnvironment.getHandlerBy(tableId).deleteProject(tableId);
    }

    @PostMapping(value = "projects/tables/{tableId}/row")
    public RowDto addRow(@PathVariable final Long tableId, @RequestBody final RowDto rowDto) {
        return databaseEnvironment.getHandlerBy(tableId).handleAddRowRequest(tableId, rowDto);
    }


    @PutMapping(value = "projects/tables/{tableId}/row")
    public RowDto updateRow(@PathVariable final Long tableId, @RequestBody final RowDto rowDto) {
        return databaseEnvironment.getHandlerBy(tableId).updateRowByTableId(rowDto, tableId);
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

    @GetMapping(value = "projects/tables/details")
    public List<TableDetailsDto> getTablesNamesList() {
        return tableService.getTablesNamesListAuthorized();
    }

    @GetMapping(value = "projects/tables/{tableId}/rows")
    public List<RowDto> getTableRows(@PathVariable final Long tableId) {
        return databaseEnvironment.getHandlerBy(tableId).getTableRowsBy(tableId);
    }

    @DeleteMapping(value = "projects/tables/{tableId}/rows/{rowId}")
    public @ResponseBody
    boolean deleteRowById(@PathVariable final Long tableId, @PathVariable final Long rowId) {
        return databaseEnvironment.getHandlerBy(tableId).handleDeleteRowRequest(tableId, rowId);
    }
}
