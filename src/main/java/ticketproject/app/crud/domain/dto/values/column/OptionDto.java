package ticketproject.app.crud.domain.dto.values.column;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class OptionDto {
  @NotNull
  private String value;
}
