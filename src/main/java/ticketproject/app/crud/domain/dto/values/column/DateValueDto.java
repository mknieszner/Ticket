package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@ToString
@JsonTypeName("DT")
@NoArgsConstructor
public class DateValueDto extends ColumnValueDto {
  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
  Date value;

  public DateValueDto(
      //final String typeName,
      final Date value) {
    //super(typeName);
    this.value = value;
  }
}
