package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName("IN")
@NoArgsConstructor
public class IntValueDto extends ColumnValueDto {
  @NotNull
  private Integer value;

  public IntValueDto(
     // final String typeName,
      final Integer value) {
    //super(typeName);
    this.value = value;
  }
}

