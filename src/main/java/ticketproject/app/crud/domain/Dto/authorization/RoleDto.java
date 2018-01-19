package ticketproject.app.crud.domain.Dto.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@Getter
public class RoleDto {
  private Long id;
  private Set<UserDto> userDtos = new HashSet<>();
  private String name;
  private String description;

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    final RoleDto roleDto = (RoleDto) o;

    return name.equals(roleDto.name);
  }

  @Override
  public int hashCode() {
    return name.hashCode();
  }
}
