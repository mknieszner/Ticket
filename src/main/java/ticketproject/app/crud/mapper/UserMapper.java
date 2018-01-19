package ticketproject.app.crud.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.Dto.authorization.UserDto;
import ticketproject.app.crud.domain.entities.authorization.User;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserMapper {
  private final PasswordEncoder passwordEncoder;

  public User mapUserDtoToUser(final UserDto userDto) {
    User user = new User(
        userDto.getUsername(),
        userDto.getFirstName(),
        userDto.getLastName(),
        userDto.getEmail(),
        passwordEncoder.encode(userDto.getPassword()),
        userDto.isEnabled());
    return user;
  }

  public UserDto mapUserToUserDto(final User user) {
    UserDto userDto = new UserDto(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword(), user.isEnabled());
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
