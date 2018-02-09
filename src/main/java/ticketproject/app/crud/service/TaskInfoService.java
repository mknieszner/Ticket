package ticketproject.app.crud.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.mapper.TaskMapper;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class TaskInfoService {
  private final UserRepository userRepositoryService;
  private final TaskMapper taskMapper;

  @PreAuthorize("principal.username == #username")
  public List<TaskDto> getUserTasks(final String username) {
    return taskMapper.mapTasksToTaskDtos(userRepositoryService.findByUsername(username).getTasks());
  }
}
