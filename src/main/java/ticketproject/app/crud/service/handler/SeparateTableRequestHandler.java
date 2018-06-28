package ticketproject.app.crud.service.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.service.DatabaseEnvironment;
import ticketproject.app.crud.service.RowValidator;
import ticketproject.app.crud.service.TableService;
import ticketproject.app.crud.service.UserService;
import ticketproject.app.crud.service.query.TableQueryService;

import javax.transaction.Transactional;

import java.util.List;

import static ticketproject.app.crud.service.DatabaseEnvironment.SEPARATE_TABLE_REQUEST_HANDLER_BEAN_NAME;

@Component(value = SEPARATE_TABLE_REQUEST_HANDLER_BEAN_NAME)
@RequiredArgsConstructor
public class SeparateTableRequestHandler implements TableRequestHandler {
    private final UserService userService;
    private final TableQueryService tableQueryService;
    private final TableService tableService;
    private final ProjectTableRepository projectTableRepository;
    private final RowValidator rowValidator;

    @Transactional
    public ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto,
                                                             DatabaseEnvironment.Environments dbEnvironment) {
        userService.saveRoleName(tableDefinitionDto.getName());

        ProjectDefinitionDto projectDefinitionDto = tableService.defineSingleTableProject(
                tableDefinitionDto,
                dbEnvironment
        );
        tableQueryService.defineTable(tableDefinitionDto);
        return projectDefinitionDto;
    }

    public RowDto handleAddRowRequest(String tableName, RowDto rowDto) {
        RowDto savedRowDto;
        rowValidator.validateRow(getTableIdByName(tableName), rowDto);
        savedRowDto = tableQueryService.addRow(rowDto, tableName);
        return savedRowDto;
    }


    public List<RowDto> getTableRowsByTableName(String tableName) {
        List<RowDto> rows;
        List<ColumnDetail> columnsDetails = getColumnsDetails(tableName);
        rows = tableQueryService.getRows(tableName, columnsDetails);
        return rows;
    }

    public boolean handleDeleteRowRequest(String tableName, Long rowId) {
        return this.tableQueryService.deleteRowById(tableName, rowId);
    }

    @Override
    public RowDto updateRowByTableId(RowDto rowDto, String tableName) {
        RowDto savedRowDto;
        rowValidator.validateRow(getTableIdByName(tableName), rowDto);
        savedRowDto = tableQueryService.updateRow(rowDto, tableName);
        return savedRowDto;
    }

    @Override
    @Transactional
    public TaskDto addTaskToRow(String tableName, Long rowId, TaskDto taskDto) {
        return this.tableQueryService.addTaskToRow(tableName, rowId, taskDto);
    }

    @Override
    public boolean deleteTask(Long taskId, String tableName) {
        return this.tableQueryService.deleteTask(taskId, tableName);
    }

    @Override
    public TaskDto assignUserToTask(String tableName, Long taskId, String username) {
        return tableQueryService.assignUserToTask(tableName,taskId,username);
    }

    @Override
    public TaskDto removeUserFromTask(String tableName, Long taskId, String username) {
        return tableQueryService.removeUserFromTask(tableName, taskId, username);
    }

    private List<ColumnDetail> getColumnsDetails(final String name) {
        return projectTableRepository.findByName(name).getColumnDetails();
    }

    private Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }
}


