package ticketproject.app.crud.domain.Dto.values.column;

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
