package ticketproject.app.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.Dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.Dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.Dto.values.ProjectDto;
import ticketproject.app.crud.domain.Dto.values.ProjectTableDto;
import ticketproject.app.crud.domain.Dto.values.RowDto;
import ticketproject.app.crud.domain.Dto.values.RowInfoDto;
import ticketproject.app.crud.service.*;

import java.security.Principal;
import java.util.List;

import static com.google.common.base.Preconditions.checkArgument;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class TableController {

  @Autowired
  private TableService tableService;
  @Autowired
  private UserService userService;
  @Autowired
  private RowValidator rowValidator;
  @Autowired
  private TableValidator tableValidator;

  @DeleteMapping(value = "projects/tables/{tableName}")
  public void deleteTableByName(@PathVariable final String tableName) {
    tableService.deleteTablebyName(tableName);
  }

  @PostMapping(value = "projects/tables/{tableName}/row")//, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public RowDto addRowByTableName(@PathVariable final String tableName, @RequestBody final RowDto rowDto, final Principal principal) {
    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRow(tableId, rowDto);
    return tableService.addRowByTableId(rowDto, tableId, principal.getName());
  }


  @PutMapping(value = "projects/tables/{tableName}/row")//, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//TODO TEST
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public RowDto updateRow(@PathVariable final String tableName, @RequestBody final RowDto rowDto, Principal principal) {

    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRow(tableId, rowDto);
    return tableService.updateRowByTableId(rowDto, tableId, principal.getName());
  }


  @GetMapping(value = "projects/tables/{tableName}/row/{taskId}/details")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public RowInfoDto getRowDetails(@PathVariable Long taskId, @PathVariable String tableName, final  Principal principal) {
    return tableService.getRowDetailsByRowIdAuthorized(taskId, tableName);
  }

  @PostMapping(value = "projects/definition")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public ProjectDefinitionDto defineProject(@RequestBody final ProjectDefinitionDto projectDefinitionDto) {
    userService.saveRuleNames(projectDefinitionDto.getTableDefinitionDtoList());
    return tableService.defineProject(projectDefinitionDto);
  }


  @PostMapping(value = "projects/tables/definition")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public ProjectDefinitionDto defineProject(@RequestBody final TableDefinitionDto tableDefinitionDto) {
    //TODO dbService.saveRuleNames(projectDefinitionDto.getTableDefinitionDtoList());
    userService.saveRuleNames(tableDefinitionDto);
    ProjectDefinitionDto projectDefinitionDto = tableService.defineSinleTableProject(tableDefinitionDto);
    return projectDefinitionDto;
  }

  //
  @GetMapping(value = "projects/tables/definition/{tableName}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public TableDefinitionDto getTableHeadersByName(@PathVariable final String tableName) {
    return tableService.getTableHeadersByName(tableName);
  }


  @GetMapping(value = "projects/tables/names")
  public List<String> getTablesNamesList(final Principal principal) {
    System.out.println(principal.getName());
    return tableService.getTablesNamesListAuthorized(principal.getName());
  }

  @GetMapping(value = "projects/tables/{tableName}/rows")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public List<RowDto> getTableRowsByTableName(@PathVariable final String tableName) {
    return tableService.getTableRowsByTableName(tableName);
  }

  @PostMapping(value = "projects/tables/{tableName}/rows")//, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#tableName)")
  public List<RowDto> addRowsToTableByTableId(@RequestBody final List<RowDto> rowDtos, @PathVariable final String tableName, final Principal principal) {
    Long tableId = tableService.getTableIdByName(tableName);
    rowValidator.validateRows(tableId, rowDtos);
    return tableService.addRowsToTableByTableId(rowDtos, tableId, principal.getName());
  }

  @DeleteMapping(value = "projects/tables/rows/{rowId}")//TODO: DO ZAMIANY NA TABLE NAME I ROWID Z REQUEST BODY
  public void deleteRowById(@PathVariable final Long rowId) {
    tableService.deleteRowById(rowId);
  }


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
//
//  @GetMapping(value = "projects/tables/definition/{tableId}")
//  public TableDefinitionDto getTableHeaders(@PathVariable final Long tableId) {
//    return tableService.getTableHeaders(tableId);
//  }

//  @GetMapping(value = "projects/tables/{tableId}/rows")
//  public List<RowDto> getTableRowsByTableId(@PathVariable final Long tableId) {
//    List<RowDto> rowDtos = tableService.getTableRowsByTableId(tableId);
//    return rowDtos;
//  }

  @DeleteMapping(value = "projects/tables/{tableId}")
  public void deleteTablebyId(@PathVariable final Long tableId) {
    tableService.deleteTablebyId(tableId);
  }
}
