package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.dao.RoleRepository;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.authorization.RoleDto;
import ticketproject.app.crud.domain.dto.authorization.UserDto;

import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;
import ticketproject.app.crud.mapper.RoleMapper;
import ticketproject.app.crud.mapper.UserMapper;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

@Service
@ToString
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserService implements UserDetailsService {
  private final RoleRepository roleRepository;
  private final RoleMapper roleMapper;
  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final TableService tableService;
  private final ActiveWebSocketUserRepository activeWebSocketUserRepository;


  @Transactional
  public UserDto registerNewUserAccount(final UserDto userDto) {
    return userMapper.mapUserToUserDto(userRepository.save(userMapper.mapUserDtoToUser(userDto)));
  }

  @Override
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    User user = checkNotNull(userRepository.findByUsername(username), new UsernameNotFoundException("username" + username));
    final boolean accountNonExpired = true;
    final boolean credentialsNonExpired = true;
    final boolean accountNonLocked = true;

    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(), accountNonExpired, credentialsNonExpired, accountNonLocked, getAuthorities(new ArrayList<>(user.getRoles())));
  }

  private static List<GrantedAuthority> getAuthorities(List<Role> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (Role role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getName()));
    }
    return authorities;
  }

  public List<RoleDto> getAllRoles() {
    return Lists.newArrayList(roleMapper.mapRoleSetToRoleDtoSet(Sets.newHashSet(roleRepository.findAll())));
  }

  public RoleDto getRoleByRoleName(final String roleName) {
    return roleMapper.mapRoleToRoleDto(roleRepository.findByName(roleName));
  }

  public UserDto addRoleToUserByUserName(final String username, final String roleName) {
    Role role = roleRepository.findByName(roleName);
    checkArgument(roleName.equals(role.getName()), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    user.addRole(role);
    userRepository.save(user);
    return userMapper.mapUserToUserDto(user);
  }


  public UserDto removeRoleFromUserByUserName(final String username, final String roleName) {
    Role role = roleRepository.findByName(roleName);
    checkArgument(roleName.equals(role.getName()), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    user.removeRoleWARN(role);
    userRepository.save(user);
    return userMapper.mapUserToUserDto(user);
  }

  public RoleDto createRole(final String roleName, final String roleDescription) {
    return roleMapper.mapRoleToRoleDto(roleRepository.save(new Role(roleName, roleDescription)));
  }


  public void removeUser(final String username) { // Iterator ? Stream
//    User user = userRepository.findByUsername(username);
//    for (Iterator<Role> roleIt = user.getRoles().iterator(); roleIt.hasNext()) {
//      Role role = roleIt.next();
//      removeUserFromRoleByUserName(role.getName(), username);
//    }
    userRepository.findByUsername(username).getRoles().stream().forEach((role) -> {
      removeUserFromRoleByUserName(role.getName(), username);
    });
    userRepository.deleteByUsername(username);
  }

  @Transactional
  public List<UserDto> getUsersAuthorized(final String username) {
    if (isAdmin(username)) {
      return getAllUsers();
    } else {
      return getUserByUsername(username);
    }
  }


  public boolean isAdmin(final String username) {
    return roleRepository.findAllByUsers_Username(username).contains(new Role("ROLE_ADMIN", null));
  }

  private List<UserDto> getAllUsers() {
    return Lists.newArrayList(userMapper.mapUserSetToUserDtoSet(Sets.newHashSet(userRepository.findAll())));
  }

  public List<UserDto> getUserByUsername(final String username) {
    return Collections.singletonList(userMapper.mapUserToUserDto(userRepository.findByUsername(username)));
  }

  public void saveRuleNames(final List<TableDefinitionDto> tableDefinitionDtoList) {
    tableDefinitionDtoList.forEach(tableDefinitionDto -> roleRepository.save(new Role(tableDefinitionDto.getName(), String.format("Table: %s access role.", tableDefinitionDto.getName()))));
  }

  public void deleteRoleByRoleName(final String roleName) {
    roleRepository.deleteByName(roleName);
  }

  public void saveRuleNames(final TableDefinitionDto tableDefinitionDto) {
    roleRepository.save(new Role(tableDefinitionDto.getName(), String.format("Table: %s access role.", tableDefinitionDto.getName())));
  }

//  public void deleteByName(final String tableName) {
//    roleRepository.deleteByName(tableName);
//  }

  public UserDto getSingleUserByUsername(final String username) {
    return userMapper.mapUserToUserDto(userRepository.findByUsername(username));
  }

  public List<String> getAllRoleNamesAuthorized(final String username) {
    if (isAdmin(username)) {
      return getAllRoles().stream().map(RoleDto::getName).collect(Collectors.toList());
    } else {
      return userRepository.findByUsername(username).getRoles().stream().map(Role::getName).collect(Collectors.toList());
    }
  }

  public RoleDto removeUserFromRoleByUserName(final String roleName, final String username) {
    Role role = roleRepository.findByName(roleName);
    System.out.println(role.getName() + "  " + roleName + "   " + username);
    checkArgument(roleName.equals(role.getName()), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    role.removeUserWARN(user);
    roleRepository.save(role);
    return roleMapper.mapRoleToRoleDto(role);
  }

  public List<String> getRolesByUsername(final String username) {
    return this.userRepository.findByUsername(username).getRoles().stream().map(Role::getName).collect(Collectors.toList());
  }

  public List<RoleDto> getFullRolesAuthorized(final String username) {
    if (isAdmin(username)) {
      return getAllRoles();
    } else {
      return Lists.newArrayList(roleMapper.mapRoleSetToRoleDtoSet(userRepository.findByUsername(username).getRoles()));
    }
  }

  public List<String> getTableUsers(final String tableName) {
    return userMapper.mapUserSetToUserDtoSet(userRepository.findAllByRolesEquals(
        roleRepository.findByName(tableName)))
        .stream()
        .map(UserDto::getUsername)
        .collect(Collectors.toList());
  }

  public List<String> getLoggedUsers() {
    return activeWebSocketUserRepository.findAll()
        .stream()
        .map(ActiveWebSocketUser::getName)
        .distinct()
        .collect(Collectors.toList());
  }
}
