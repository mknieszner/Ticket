package ticketproject.app.crud.domain.Dto.definition;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProjectDefinitionDto {
  private Long id;
  private String name;
  private List<TableDefinitionDto> tableDefinitionDtoList = new ArrayList<>();

  public ProjectDefinitionDto(final String name, final List<TableDefinitionDto> tableDefinitionDtoList) {
    this.name = name;
    this.tableDefinitionDtoList.addAll(tableDefinitionDtoList);
  }
}
