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
         // columnValueDto.getTypeName(),
          ((IntValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof ShortTextValueDto) {
      return new ShortTextValue(
        //  columnValueDto.getTypeName(),
          ((ShortTextValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DateValueDto) {
      return new DateValue(
        //  columnValueDto.getTypeName(),
          ((DateValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DescriptionValueDto) {
      return new DescriptionValue(
         // columnValueDto.getTypeName(),
          ((DescriptionValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof EnumValueDto) {
      return new EnumValue(
         // columnValueDto.getTypeName(),
          ((EnumValueDto) columnValueDto).getValue()
        //  ,((EnumValueDto) columnValueDto).getOptionList()
      );
    }
    throw new IllegalArgumentException("Unknown Value Type!" + columnValueDto.getClass()
    //    getTypeName()

    );
  }

  public List<ColumnValueDto> mapToColumnValueDtoList(List<ColumnValue> columnValue) {
    return columnValue.stream().map(this::mapToColumnValueDto).collect(Collectors.toList());
  }

  private ColumnValueDto mapToColumnValueDto(final ColumnValue columnValue) {
    if (columnValue instanceof IntValue) {
      return new IntValueDto(
          //columnValue.getTypeName(),
          ((IntValue) columnValue).getValue());
    }
    if (columnValue instanceof ShortTextValue) {
      return new ShortTextValueDto(
          //columnValue.getTypeName(),
          ((ShortTextValue) columnValue).getValue());
    }
    if (columnValue instanceof DateValue) {
      return new DateValueDto(
          //columnValue.getTypeName(),
          ((DateValue) columnValue).getValue());
    }
    if (columnValue instanceof DescriptionValue) {
      return new DescriptionValueDto(
          //columnValue.getTypeName(),
          ((DescriptionValue) columnValue).getValue());
    }
    if (columnValue instanceof EnumValue) {
      return new EnumValueDto(
          //columnValue.getTypeName(),
          ((EnumValue) columnValue).getValue()
          //,((EnumValue) columnValue).getOptionList()
      );
    }
    throw new IllegalArgumentException("Unknown Column Type!"
     //   + columnValue.getTypeName()
    );
  }
}