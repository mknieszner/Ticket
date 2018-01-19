package ticketproject.app.crud.domain.Dto.values;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ProjectTableDto {
  private Long id;
  private String name;
  private List<RowDto> rowDtos = new ArrayList<>();
}
