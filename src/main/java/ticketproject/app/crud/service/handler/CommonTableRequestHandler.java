package ticketproject.app.crud.service.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectRepository;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.dao.RoleRepository;
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
    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;

    @Transactional
    public ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto,
                                                             DatabaseEnvironment.Environments dbEnvironment) {
        userService.saveRoleName(tableDefinitionDto.getName());
        return tableService.defineSingleTableProject(
                tableDefinitionDto,
                dbEnvironment
        );
    }

    public RowDto handleAddRowRequest(Long tableId, RowDto rowDto) {
        rowValidator.validateRow(tableId, rowDto);
        return tableService.addRow(rowDto, tableId);
    }

    @Override
    public List<RowDto> getTableRowsBy(Long tableId) {
        return tableService.getTableRowsBy(tableId);
    }

    public boolean handleDeleteRowRequest(Long tableId, Long rowId) {
        tableService.deleteRowById(rowId);
        return true;
    }

    @Override
    public RowDto updateRowByTableId(RowDto rowDto, Long tableId) {
        return tableService.updateRowByTableId(rowDto, tableId);
    }

    @Override
    public TaskDto addTaskToRow(Long tableId, Long rowId, TaskDto taskDto) {
        return tableService.addTaskToRow(rowId, taskDto);
    }

    @Override
    public boolean deleteTask(Long tableId, Long taskId) {
        return tableService.deleteTask(taskId, tableId);
    }

    @Override
    public TaskDto assignUserToTask(Long tableId, Long taskId, String username) {
        return tableService.assignUserToTask(taskId, username);
    }

    @Override
    public TaskDto removeUserFromTask(Long tableId, Long taskId, String username) {
        return tableService.removeUserFromTask(taskId, username);
    }

    @Override
    public TaskDto updateTask(Long tableId, TaskDto taskDto) {
        return tableService.updateTask(tableId, taskDto);
    }

    @Override
    public boolean deleteProject(Long tableId) {
        tableService.deleteTable(tableId);
        return true;
    }

    private Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }
}