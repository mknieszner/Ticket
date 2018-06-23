package ticketproject.app.crud.service.handler;

import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.service.DatabaseEnvironment;


import java.util.List;

public interface TableRequestHandler {

    ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto, DatabaseEnvironment.Environments dbEnvironment);

    RowDto handleAddRowRequest(String tableName, RowDto rowDto);

    List<RowDto> getTableRowsByTableName(String tableName);

    boolean handleDeleteRowRequest(String tableName, Long rowId);

    RowDto updateRowByTableId(RowDto rowDto, String tableName);
}
