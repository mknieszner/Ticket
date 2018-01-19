package ticketproject.app.crud.domain.Dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName("DE")
@NoArgsConstructor
public class DescriptionValueDto extends ColumnValueDto {
  @NotNull
  String value;

  public DescriptionValueDto(
      //final String typeName,
      final String value
  ) {
    //super(typeName);
    this.value = value;
  }
}
