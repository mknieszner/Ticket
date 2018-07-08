package ticketproject.app.crud.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import groovy.lang.Lazy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.service.dao.RoleRepositoryService;
import ticketproject.app.crud.service.dao.UserRepositoryService;
import ticketproject.app.crud.domain.dto.authorization.PasswordResetData;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserService implements UserDetailsService {
  private final RoleRepositoryService roleRepository;
  private final RoleMapper roleMapper;
  private final UserRepositoryService userRepository;
  private final UserMapper userMapper;
  private final TableService tableService;
  private final ActiveWebSocketUserRepository activeWebSocketUserRepository;
  @Autowired
  @Lazy
  private PasswordEncoder passwordEncoder;



  @Transactional
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public UserDto registerNewUserAccount(final UserDto userDto) {
    return userMapper.mapUserToUserDto(userRepository.save(userMapper.mapUserDtoToUser(userDto)));
  }

  @Override
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    User user = checkNotNull(userRepository.findByUsername(username), new UsernameNotFoundException("username" + username));
    final boolean accountNonExpired = true;
    final boolean credentialsNonExpired = true;
    final boolean accountNonLocked = true;
    return new org.springframework.security.core.userdetails.User(
        user.getUsername(),
        user.getPassword(),
        user.isEnabled(),
        accountNonExpired,
        credentialsNonExpired,
        accountNonLocked,
        getAuthorities(new ArrayList<>(user.getRoles())));
  }

  private static List<GrantedAuthority> getAuthorities(List<Role> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (Role role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getName()));
    }
    return authorities;
}

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
  public List<RoleDto> getAllRoles() {
    return Lists.newArrayList(roleMapper.mapRoleSetToRoleDtoSet(Sets.newHashSet(roleRepository.findAll())));
  }


  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#roleName)")
  public RoleDto getRoleByRoleName(final String roleName) {
    return roleMapper.mapRoleToRoleDto(roleRepository.findByName(roleName));
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
  public UserDto addRoleToUser(final String username, final String roleName) {
    Role role = checkNotNull(roleRepository.findByName(roleName), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    user.addRole(role);
    return userMapper.mapUserToUserDto(userRepository.save(user));
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
  public UserDto addUserToRole(final String username, final String roleName) {
    Role role = checkNotNull(roleRepository.findByName(roleName), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    role.addUser(user);
    return userMapper.mapUserToUserDto(userRepository.save(user));
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
  public UserDto removeRoleFromUserByUserName(final String username, final String roleName) {
    Role role = roleRepository.findByName(roleName);
    checkArgument(roleName.equals(role.getName()), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    checkArgument(user.getRoles()
            .stream()
            .anyMatch(r -> r.getName().equals(roleName)),new IllegalArgumentException("USER DOES NOT HAVE ROLE"));
    user.removeRoleWARN(role);
    userRepository.save(user);
    return userMapper.mapUserToUserDto(user);
  }

  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public RoleDto createRole(final String roleName, final String roleDescription) {
    return roleMapper.mapRoleToRoleDto(roleRepository.save(new Role(roleName, roleDescription)));
  }

  @Transactional
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public void removeUser(final String username) { //TODO: Check Iterator ? Stream Concurent error
    User user = userRepository.findByUsername(username);
    Set<Role> roles = user.getRoles();
    for (Iterator<Role> roleIt = roles.iterator(); roleIt.hasNext();) {
      Role role = roleIt.next();
      removeUserFromRoleByUserName(role.getName(), username);
    }
    userRepository.deleteByUsername(username);
  }

  @Transactional
  public List<UserDto> getUsersAuthorized() {
    String username = getCurrentUserUsername();
    if (isAdmin(username)) {
      return getAllUsers();
    } else {
      return getUserByUsername(username);
    }
  }



  public boolean isAdmin(final String username) {
    return roleRepository.findAllByUsers_Username(username).contains(new Role("ROLE_ADMIN", null));
  }

  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  private List<UserDto> getAllUsers() {
    return Lists.newArrayList(userMapper.mapUserSetToUserDtoSet(Sets.newHashSet(userRepository.findAll())));
  }

  @PreAuthorize("principal.username == #username")
  public List<UserDto> getUserByUsername(final String username) {
    return Collections.singletonList(userMapper.mapUserToUserDto(userRepository.findByUsername(username)));
  }

  public void saveRuleNames(final List<TableDefinitionDto> tableDefinitionDtoList) {
    tableDefinitionDtoList.forEach(
        tableDefinitionDto -> roleRepository.save(
            new Role(tableDefinitionDto.getName(), String.format("Table: %s access role.", tableDefinitionDto.getName()))));
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#roleName)")
  public void deleteRoleByRoleName(final String roleName) {
    roleRepository.deleteByName(roleName);
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
  public void saveRoleName(final String roleName) {
    if (roleRepository.findByName(roleName) == null) {
      roleRepository.save(new Role(roleName, String.format("Table: %s access role.", roleName)));
    }
  }
  @PreAuthorize("principal.username == #username || hasAnyAuthority('ROLE_ADMIN')")
  public UserDto getSingleUserByUsername(final String username) {
    return userMapper.mapUserToUserDto(userRepository.findByUsername(username));
  }


  public List<String> getAllRoleNamesAuthorized(final String username) {
    if (isAdmin(username)) {
      return getAllRoles()
          .stream()
          .map(RoleDto::getName)
          .collect(Collectors.toList());
    } else {
      return userRepository.findByUsername(username)
          .getRoles()
          .stream()
          .map(Role::getName)
          .collect(Collectors.toList());
    }
  }

  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public RoleDto removeUserFromRoleByUserName(final String roleName, final String username) {
    Role role = checkNotNull(roleRepository.findByName(roleName), new IllegalArgumentException("ROLE NOT FOUND"));
    User user = checkNotNull(userRepository.findByUsername(username), new IllegalArgumentException("USER NOT FOUND"));
    role.removeUserWARN(user);
    return roleMapper.mapRoleToRoleDto(roleRepository.save(role));
  }

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || principal.username == #username")
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

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','#tablename')")
  public List<String> getTableUsers(final String tableName) {
    return userMapper.mapUserSetToUserDtoSet(
        userRepository.findAllByRolesContaining(
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

  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') || principal.username == #userDto.username")
  public UserDto updateUserDetails(final UserDto userDto) {
    User user = userRepository.findByUsername(userDto.getUsername());
    User updatedUser = new User(
        user.getId(),
        user.getUsername(),
        userDto.getFirstName(),
        userDto.getLastName(),
        userDto.getEmail(),
        user.getPassword(),
        user.isEnabled(),
        user.getRoles(),
        user.getTasks()
    );
    return userMapper.mapUserToUserDto(userRepository.save(updatedUser));
  }

  public boolean updateUserPassword(final PasswordResetData passwordResetData, final String username) {
    User user = userRepository.findByUsername(username);
    checkArgument(passwordEncoder.matches(passwordResetData.getOldPassword(),user.getPassword()), new RuntimeException("Wrong password"));
    userRepository.save(new User(
        user.getId(),
        user.getUsername(),
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        passwordEncoder.encode(passwordResetData.getNewPassword()),
        user.isEnabled(),
        user.getRoles(),
        user.getTasks()
    ));
    return true;
  }

  public static String getCurrentUserUsername(){
    return (String) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
  }
}
