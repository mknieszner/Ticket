package ticketproject.app.crud.domain.dto.definition;

import lombok.*;
import ticketproject.app.crud.domain.entities.types.Option;
import ticketproject.app.crud.service.helper.ColumnType;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ColumnDetailDefinitionDto {
  String name;
  ColumnType.Types type;
  List<Option> optionList = new ArrayList<>();
}
