package ticketproject.app.crud.domain.dto.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ticketproject.app.crud.domain.dto.values.TaskDto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  private String username;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private boolean enabled;
  Set<String> roleNames = new HashSet<>();
  List<TaskDto> taskDtos = new ArrayList<>();

  public UserDto(final String username,
                 final String firstName,
                 final String lastName,
                 final String email,
                 final String password,
                 final boolean enabled,
                 final List<TaskDto> taskDtos) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.enabled = enabled;
    this.taskDtos.addAll(taskDtos);
  }

  public void addRoleDto(final String roleName) {
    roleNames.add(roleName);
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    final UserDto userDto = (UserDto) o;

    return username.equals(userDto.username);
  }

  @Override
  public int hashCode() {
    return username.hashCode();
  }
}
