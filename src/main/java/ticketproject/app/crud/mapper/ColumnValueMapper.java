package ticketproject.app.crud.mapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.dto.values.column.*;
import ticketproject.app.crud.domain.entities.types.*;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
@Getter
public class ColumnValueMapper {

    public List<ColumnValue> mapToTableColumnList(List<ColumnValueDto> columnValueDto) {
        return columnValueDto.stream()
                .map(ColumnValueDto::mapThisToColumnValue)
                .collect(Collectors.toList());
    }

    public List<ColumnValueDto> mapToColumnValueDtoList(List<ColumnValue> columnValue) {
        return columnValue.stream()
                .map(ColumnValue::mapThisToColumnValueDto)
                .collect(Collectors.toList());
    }
}