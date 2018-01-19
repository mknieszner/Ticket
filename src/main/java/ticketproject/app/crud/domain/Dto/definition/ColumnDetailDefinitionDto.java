package ticketproject.app.crud.domain.Dto.definition;

import lombok.*;
import ticketproject.app.crud.domain.entities.types.Option;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ColumnDetailDefinitionDto {
  String name;

  //"IN" "EN" "DE" "DT" "ST"
  String type;
  List<Option> optionList = new ArrayList<>();

  public ColumnDetailDefinitionDto(final String name, final String type) {
    this.name = name;
    this.type = type;
  }
}
