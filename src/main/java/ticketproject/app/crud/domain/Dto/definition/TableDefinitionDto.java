package ticketproject.app.crud.domain.Dto.definition;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TableDefinitionDto {
  Long id;
  String name;
  List<ColumnDetailDefinitionDto> columnDetailDefinitionDtoList = new ArrayList<>();
}
