package ticketproject.app.crud.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.domain.entities.Task;
import ticketproject.app.crud.domain.entities.authorization.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TaskMapper {
  private final UserRepository userRepository;

  public TaskDto mapTaskToTaskDto(final Task task) {
    return new TaskDto(
        task.getId(),
        task.getTableId(),
        task.getName(),
        task.getDescription(),
        task.getStatus(),
        task.getUsers().stream().map(User::getUsername).collect(Collectors.toSet()),
        mapTasksToTaskDtos(task.getTasks())
    );
  }


  public Task mapTaskDtoToTask(final TaskDto taskDto) {
    return new Task(
      taskDto.getId(),
      taskDto.getTableId(),
      taskDto.getName(),
      taskDto.getDescription(),
      taskDto.getStatus(),
      taskDto.getUserNames().stream().map(userRepository::findByUsername).collect(Collectors.toSet()),
      mapTaskDtosToTasks(taskDto.getTaskDtos())
    );
  }

  @Transactional
  public List<Task> mapTaskDtosToTasks(List<TaskDto> taskDtos) {
    return taskDtos.stream().map(this::mapTaskDtoToTask).collect(Collectors.toList());
  }

  @Transactional
  public List<TaskDto> mapTasksToTaskDtos(List<Task> tasks) {
    return tasks.stream().map(this::mapTaskToTaskDto).collect(Collectors.toList());
  }
}
