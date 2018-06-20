package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.ShortTextValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName(ColumnType.ST)

public class ShortTextValueDto extends ColumnValueDto {
  @NotNull
  private String value;

  public ShortTextValueDto(final String value) {
    super(ColumnType.Types.ST);
    this.value = value;
  }

  public ShortTextValueDto(){
    super(ColumnType.Types.ST);
  }

  @Override
  public ColumnValue mapThisToColumnValue() {
    return new ShortTextValue(value);
  }
}
