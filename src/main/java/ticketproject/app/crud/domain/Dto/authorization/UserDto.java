package ticketproject.app.crud.domain.Dto.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
@AllArgsConstructor
public class UserDto {
  private String username;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private boolean enabled;
  Set<String> roleNames = new HashSet<>();

  public UserDto(final String username, final String firstName, final String lastName, final String email, final String password, final boolean enabled) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.enabled = enabled;
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
