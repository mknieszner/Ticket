package ticketproject.app.crud.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.Dto.authorization.RoleDto;
import ticketproject.app.crud.domain.entities.authorization.Role;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoleMapper {
  @Autowired
  UserMapper userMapper;

  public Set<Role> mapRoleDtoSetToRoleSet(final Set<RoleDto> roleDtos) {
    return roleDtos.stream().map(this::mapRoleDtoToRole).collect(Collectors.toSet());
  }

  public Role mapRoleDtoToRole(final RoleDto roleDto) {
    return new Role(roleDto.getId(), userMapper.mapUserDtoSetToUserSet(roleDto.getUserDtos()), roleDto.getName(), roleDto.getDescription());
  }

  public RoleDto mapRoleToRoleDto(final Role role) {
    return new RoleDto(role.getId(), userMapper.mapUserSetToUserDtoSet(role.getUsers()), role.getName(), role.getDescription());
  }

  public Set<RoleDto> mapRoleSetToRoleDtoSet(final Set<Role> roles) {
    return roles.stream().map(this::mapRoleToRoleDto).collect(Collectors.toSet());
  }
}
