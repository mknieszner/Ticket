package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName("ST")
@NoArgsConstructor
public class ShortTextValueDto extends ColumnValueDto {
  @NotNull
  private String value;

  public ShortTextValueDto(
  //    final String typeName,
      final String value) {
  //  super(typeName);
    this.value = value;
  }
}
