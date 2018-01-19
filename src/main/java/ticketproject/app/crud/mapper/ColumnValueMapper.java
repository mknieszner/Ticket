package ticketproject.app.crud.mapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.Dto.values.column.*;
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
      System.out.println("IntValueDto");
      return new IntValue(
         // columnValueDto.getTypeName(),
          ((IntValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof ShortTextValueDto) {
      System.out.println("ShortTextValueDto");
      return new ShortTextValue(
        //  columnValueDto.getTypeName(),
          ((ShortTextValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DateValueDto) {
      System.out.println("DateValueDto");
      return new DateValue(
        //  columnValueDto.getTypeName(),
          ((DateValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof DescriptionValueDto) {
      System.out.println("DescriptionValueDto");
      return new DescriptionValue(
         // columnValueDto.getTypeName(),
          ((DescriptionValueDto) columnValueDto).getValue());
    }
    if (columnValueDto instanceof EnumValueDto) {
      System.out.println("EnumValueDto");
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
      System.out.println("IntValue");
      return new IntValueDto(
          //columnValue.getTypeName(),
          ((IntValue) columnValue).getValue());
    }
    if (columnValue instanceof ShortTextValue) {
      System.out.println("ShortTextValue");
      return new ShortTextValueDto(
          //columnValue.getTypeName(),
          ((ShortTextValue) columnValue).getValue());
    }
    if (columnValue instanceof DateValue) {
      System.out.println("DateValue");
      return new DateValueDto(
          //columnValue.getTypeName(),
          ((DateValue) columnValue).getValue());
    }
    if (columnValue instanceof DescriptionValue) {
      System.out.println("DescriptionValue");
      return new DescriptionValueDto(
          //columnValue.getTypeName(),
          ((DescriptionValue) columnValue).getValue());
    }
    if (columnValue instanceof EnumValue) {
      System.out.println("EnumValue");
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