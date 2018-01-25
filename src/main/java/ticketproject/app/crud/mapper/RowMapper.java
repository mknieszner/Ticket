package ticketproject.app.crud.mapper;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.RowInfoDto;
import ticketproject.app.crud.domain.entities.Row;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Getter
public class RowMapper {
  private final ColumnValueMapper columnValueMapper;
  private final TaskMapper taskMapper;

  public RowDto mapToRowDto(final Row row) {
    return new RowDto(
        row.getId(),
        row.getName(),
        columnValueMapper.mapToColumnValueDtoList(row.getColumnValues()),
        taskMapper.mapTasksToTaskDtos(row.getTasks()),
        row.getCreatedBy(),
        row.getCreatedOn(),
        row.getLastModifiedBy(),
        row.getLastModifiedOn()
    );
  }

  public Row mapToRow(final RowDto rowDto) {
    return new Row(
        rowDto.getId(),
        rowDto.getName(),
        columnValueMapper.mapToTableColumnList(rowDto.getColumnValueDtos()),
        taskMapper.mapTaskDtosToTasks(rowDto.getTaskDtos())
    );
  }

  public List<Row> mapToRowList(final List<RowDto> rowDtos) {
    return rowDtos
        .stream()
        .map(this::mapToRow)
        .collect(Collectors.toList());
  }

  public List<RowDto> mapToRowDtos(final List<Row> rows) {
    return rows
        .stream()
        .map(this::mapToRowDto)
        .collect(Collectors.toList());
  }

  public Row updateRow(Row oldRow, RowDto newRow, final String username) {
    return new Row(
        oldRow.getId(),
        oldRow.getName(),
        oldRow.getCreatedBy(),
        oldRow.getCreatedOn(),
        username,
        new Date(),
        columnValueMapper.mapToTableColumnList(newRow.getColumnValueDtos()),
        oldRow.getProjectTable(),
        oldRow.getTasks()
    );
  }

  public RowInfoDto mapRowToRowInfoDto(final Row row) {
    return new RowInfoDto(
        row.getId(),
        row.getName(),
        row.getCreatedBy(),
        row.getCreatedOn(),
        row.getLastModifiedBy(),
        row.getLastModifiedOn()
    );
  }
}
