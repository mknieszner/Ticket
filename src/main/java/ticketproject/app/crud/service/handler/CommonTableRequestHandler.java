package ticketproject.app.crud.service.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.service.DatabaseEnvironment;
import ticketproject.app.crud.service.RowValidator;
import ticketproject.app.crud.service.TableService;
import ticketproject.app.crud.service.UserService;

import javax.transaction.Transactional;

import java.util.List;

import static ticketproject.app.crud.service.DatabaseEnvironment.COMMON_TABLE_REQUEST_HANDLER_BEAN_NAME;

@Component(value = COMMON_TABLE_REQUEST_HANDLER_BEAN_NAME)
@RequiredArgsConstructor
public class CommonTableRequestHandler implements TableRequestHandler {
    private final UserService userService;
    private final TableService tableService;
    private final ProjectTableRepository projectTableRepository;
    private final RowValidator rowValidator;

    @Transactional
    public ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto,
                                                             DatabaseEnvironment.Environments dbEnvironment) {
        userService.saveRoleName(tableDefinitionDto.getName());
        return tableService.defineSingleTableProject(
                tableDefinitionDto,
                dbEnvironment
        );
    }

    public RowDto handleAddRowRequest(String tableName, RowDto rowDto) {
        rowValidator.validateRow(getTableIdByName(tableName), rowDto);
        return tableService.addRow(rowDto, tableName);
    }


    public List<RowDto> getTableRowsByTableName(String tableName) {
        return tableService.getTableRowsByTableName(tableName);
    }

    public boolean handleDeleteRowRequest(String tableName, Long rowId) {
        tableService.deleteRowById(rowId);
        return true;
    }

    @Override
    public RowDto updateRowByTableId(RowDto rowDto, String tableName) {
        return tableService.updateRowByTableId(rowDto, tableName);
    }

    @Override
    public TaskDto addTaskToRow(String tableName, Long rowId, TaskDto taskDto) {
        return tableService.addTaskToRow(rowId, taskDto);
    }

    @Override
    public boolean deleteTask(Long taskId, String tableName) {
        return tableService.deleteTask(taskId, tableName);
    }

    @Override
    public TaskDto assignUserToTask(String tableName, Long taskId, String username) {
        return tableService.assignUserToTask(taskId, username);
    }

    @Override
    public TaskDto removeUserFromTask(String tableName, Long taskId, String username) {
        return tableService.removeUserFromTask(taskId, username);
    }

    private Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }
}