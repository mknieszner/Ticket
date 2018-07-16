package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.IntValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName(ColumnType.IN)
public class IntValueDto extends ColumnValueDto {
  @NotNull
  private Integer value;

  public IntValueDto(final Integer value) {
    super(ColumnType.Types.IN);
    this.value = value;
  }

  public IntValueDto() {
    super(ColumnType.Types.IN);
  }

  @Override
  public ColumnValue mapThisToColumnValue() {
    return new IntValue(value);
  }

  public Long getValue(){
    return (value.longValue());
  }
}

