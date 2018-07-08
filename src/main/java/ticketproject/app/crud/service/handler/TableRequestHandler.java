package ticketproject.app.crud.service.handler;

import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.service.DatabaseEnvironment;


import java.util.List;

public interface TableRequestHandler {

    ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto, DatabaseEnvironment.Environments dbEnvironment);

    RowDto handleAddRowRequest(Long tableId, RowDto rowDto);

    List<RowDto> getTableRowsBy(Long tableId);

    boolean handleDeleteRowRequest(Long tableId, Long rowId);

    RowDto updateRowByTableId(RowDto rowDto, Long tableId);

    TaskDto addTaskToRow(Long tableId, Long rowId, TaskDto taskDto);

    boolean deleteTask(Long tableId, Long taskId);

    TaskDto assignUserToTask(Long tableId, Long taskId, String username);

    TaskDto removeUserFromTask(Long tableId, Long taskId, String username);

    TaskDto updateTask(Long tableId, TaskDto taskDto);
}
