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
    return columnValueDto.stream().map(this::mapToColumnValue).collect(Collectors.toList());
  }

  private ColumnValue mapToColumnValue(final ColumnValueDto columnValueDto) {
    if (columnValueDto instanceof IntValueDto) {
      return new IntValue(
          ((IntValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof ShortTextValueDto) {
      return new ShortTextValue(
          ((ShortTextValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DateValueDto) {
      return new DateValue(
          ((DateValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DescriptionValueDto) {
      return new DescriptionValue(
          ((DescriptionValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof EnumValueDto) {
      return new EnumValue(
          ((EnumValueDto) columnValueDto).getValue()
      );
    }
    throw new IllegalArgumentException("Unknown Value Type!" + columnValueDto.getClass()
    );
  }

  public List<ColumnValueDto> mapToColumnValueDtoList(List<ColumnValue> columnValue) {
    return columnValue.stream().map(this::mapToColumnValueDto).collect(Collectors.toList());
  }

  private ColumnValueDto mapToColumnValueDto(final ColumnValue columnValue) {
    if (columnValue instanceof IntValue) {
      return new IntValueDto(
          ((IntValue) columnValue).getValue());
    }
    if (columnValue instanceof ShortTextValue) {
      return new ShortTextValueDto(
          ((ShortTextValue) columnValue).getValue());
    }
    if (columnValue instanceof DateValue) {
      return new DateValueDto(
          ((DateValue) columnValue).getValue());
    }
    if (columnValue instanceof DescriptionValue) {
      return new DescriptionValueDto(
          ((DescriptionValue) columnValue).getValue());
    }
    if (columnValue instanceof EnumValue) {
      return new EnumValueDto(
          ((EnumValue) columnValue).getValue()
      );
    }
    throw new IllegalArgumentException("Unknown Column Type!"
    );
  }
}