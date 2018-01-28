package ticketproject.app.crud.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.mapper.TaskMapper;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TaskInfoService {
  private final UserRepository userRepository;
  private final TaskMapper taskMapper;
  public List<TaskDto> getUserTasks(final String username) {
    return taskMapper.mapTasksToTaskDtos(userRepository.findByUsername(username).getTasks());
  }
}
