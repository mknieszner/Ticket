package ticketproject.app.crud.domain.dto.values;

import lombok.*;
import ticketproject.app.crud.domain.entities.Task;
import ticketproject.app.crud.domain.entities.authorization.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TaskDto {

  private Long id;

  private String name;

  private String description;

  private Task.Status status;

  //TODO: adding attachments
  //List<Blob> artifacts;

  private List<String> userNames = new ArrayList<>();

  private List<TaskDto> taskDtos = new ArrayList<>();
}
