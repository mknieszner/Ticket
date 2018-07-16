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
    private final RoleRepository roleRepository;
    private final ProjectRepository projectRepository;

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

    public RowDto handleAddRowRequest(Long tableId, RowDto rowDto) {
        RowDto savedRowDto;
        rowValidator.validateRow(tableId, rowDto);
        savedRowDto = tableQueryService.addRow(rowDto, getTableNameBy(tableId));
        return savedRowDto;
    }

    @Override
    public List<RowDto> getTableRowsBy(Long tableId) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        List<RowDto> rows;
        List<ColumnDetail> columnsDetails = getColumnsDetails(tableName);
        rows = tableQueryService.getRows(tableName, columnsDetails);
        return rows;
    }

    public boolean handleDeleteRowRequest(Long tableId, Long rowId) {
        return this.tableQueryService.deleteRowById(getTableNameBy(tableId), rowId);
    }

    @Override
    public RowDto updateRowByTableId(RowDto rowDto, Long tableId) {
        RowDto savedRowDto;
        rowValidator.validateRow(tableId, rowDto);
        savedRowDto = tableQueryService.updateRow(rowDto, getTableNameBy(tableId));
        return savedRowDto;
    }

    @Override
    @Transactional
    public TaskDto addTaskToRow(Long tableId, Long rowId, TaskDto taskDto) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        taskDto.setTableId(tableId);
        return this.tableQueryService.addTaskToRow(tableName, rowId, taskDto);
    }

    @Override
    public boolean deleteTask(Long tableId, Long taskId) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        return this.tableQueryService.deleteTask(taskId, tableName);
    }

    @Override
    public TaskDto assignUserToTask(Long tableId, Long taskId, String username) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        return tableQueryService.assignUserToTask(tableName, taskId, username);
    }

    @Override
    public TaskDto removeUserFromTask(Long tableId, Long taskId, String username) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        return tableQueryService.removeUserFromTask(tableName, taskId, username);
    }

    @Override
    public TaskDto updateTask(Long tableId, TaskDto taskDto) {
        String tableName = projectTableRepository.findOne(tableId).getName();
        return tableQueryService.updateTask(tableName, taskDto);
    }

    @Override
    public boolean deleteProject(Long tableId) {
        String tableName = getTableNameBy(tableId);
        projectRepository.delete(tableId);
        roleRepository.deleteByName(tableName);
        tableQueryService.deleteTable(tableName);//todo non transactional -> scheduler??
        return true;
    }

    private List<ColumnDetail> getColumnsDetails(final String name) {
        return projectTableRepository.findByName(name).getColumnDetails();
    }

    private String getTableNameBy(final Long tableId) {
        return projectTableRepository.findOne(tableId).getName();
    }
}


