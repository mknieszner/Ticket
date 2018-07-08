package ticketproject.app.crud.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.authorization.UserDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.service.TableService;
import ticketproject.app.crud.service.query.TableQueryService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserMapper {
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    @Lazy
    private TableQueryService tableQueryService;
    private final ProjectTableRepository projectTableRepository;
    private final TableService tableService;
    private final TaskMapper taskMapper;
    private static final List<String> NO_TABLE_ROLES = Arrays.asList("ROLE_USER", "ROLE_ADMIN");

  public User mapUserDtoToUser(final UserDto userDto) {
    User user = new User(
        userDto.getUsername(),
        userDto.getFirstName(),
        userDto.getLastName(),
        userDto.getEmail(),
        passwordEncoder.encode(userDto.getPassword()),
        userDto.isEnabled(),
        taskMapper.mapTaskDtosToTasks(userDto.getTaskDtos().stream()
                .filter(taskDto -> projectTableRepository.exists(taskDto.getTableId()) || taskDto.getTableId() == null)
                .collect(toList())
        )
    );
    return user;
  }



    private List<TaskDto> userTasks(User user) {
        List<TaskDto> userTasks = new ArrayList<>();
        List<String> commonTableRoleNames = tableService.findAllUserCommonTableRoleNames(user);

        //common table tasks
        userTasks.addAll(taskMapper.mapTasksToTaskDtos(user.getTasks()));

        //separate table tasks
        user.getRoles().stream()
                .map(Role::getName)
                .filter(roleName -> !NO_TABLE_ROLES.contains(roleName))
                .filter(roleName -> !commonTableRoleNames.contains(roleName))
                .forEach(roleName ->
                        userTasks.addAll(tableQueryService.getUserTasks(roleName, user.getUsername()))
                );

        return userTasks;
    }

    public UserDto mapUserToUserDto(final User user) {
        UserDto userDto = new UserDto(
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                userTasks(user));
        user.getRoles().forEach(role -> userDto.addRoleDto(role.getName()));
        return userDto;
    }

    public Set<UserDto> mapUserSetToUserDtoSet(final Set<User> users) {
        return users.stream().map(this::mapUserToUserDto).collect(Collectors.toSet());
    }

    public Set<User> mapUserDtoSetToUserSet(final Set<UserDto> users) {
        return users.stream().map(this::mapUserDtoToUser).collect(Collectors.toSet());
    }
}
