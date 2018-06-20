package ticketproject.app.crud.domain.dto.values;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ticketproject.app.crud.service.DatabaseEnviroment;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProjectDto {
  private Long id;
  private String name;
  private List<ProjectTableDto> projectTableDtos = new ArrayList<>();
  private DatabaseEnviroment databaseEnviroment;
}
