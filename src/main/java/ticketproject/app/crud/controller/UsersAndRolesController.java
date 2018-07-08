package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.dto.authorization.PasswordResetData;
import ticketproject.app.crud.domain.dto.authorization.RoleDto;
import ticketproject.app.crud.domain.dto.authorization.UserDto;
import ticketproject.app.crud.service.UserService;

import java.security.Principal;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin("*")
@RestController
@RequestMapping("/v1/")
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UsersAndRolesController {
  private final UserService userService;

  @GetMapping(value = "roles/details")
  public List<RoleDto> getFullRolesAuthorized(final Principal principal) {
    return userService.getFullRolesAuthorized(principal.getName());
  }

  @GetMapping(value = "users/ws-active")
  public List<String> getLoggedUsers(final Principal principal) {
    return userService.getLoggedUsers();
  }

  @GetMapping(value = "roles")
  public List<String> getAllRoleNames(final Principal principal) {
    return userService.getAllRoleNamesAuthorized(principal.getName());
  }

  @PostMapping(value = "roles/{roleName}")
  public RoleDto createRole(@PathVariable final String roleName, @RequestBody final String roleDescription) {
    return userService.createRole(roleName, roleDescription);
  }

  @GetMapping(value = "roles/{roleName}")
  public RoleDto getRoleByRoleName(@PathVariable final String roleName) {
    return userService.getRoleByRoleName(roleName);
  }

  @DeleteMapping(value = "roles/{roleName}")
  public boolean deleteRoleByRoleName(@PathVariable final String roleName) {
    userService.deleteRoleByRoleName(roleName);
    return true;
  }

  @GetMapping(value = "users/{username}")
  public UserDto getUserByUsername(@PathVariable final String username) {
    return userService.getSingleUserByUsername(username);
  }

  @PutMapping(value = "users/{username}") // TODO Remove PathVariable - front
  public UserDto updateUserDetails(@RequestBody UserDto userDto) {
    return userService.updateUserDetails(userDto);
  }

  @PutMapping(value = "users/{username}/pass") // TODO Remove PathVariable - front
  public boolean updateUserPassword(@RequestBody PasswordResetData passwordResetData, final Principal principal) {
      return userService.updateUserPassword(passwordResetData, principal.getName());
  }

  @PostMapping(value = "users/{username}/roles/{roleName}")
  public UserDto addRoleToUserByUserName(@PathVariable final String username, @PathVariable final String roleName) {
    return userService.addRoleToUser(username, roleName);
  }

  @PostMapping(value = "roles/{roleName}/users/{username}")
  public UserDto addUserToRoleByRoleName(@PathVariable final String roleName, @PathVariable final String username) {
    return userService.addUserToRole(username, roleName);
  }

  @DeleteMapping(value = "users/{username}/roles/{roleName}")
  public UserDto removeRoleFromUserByUserName(@PathVariable final String username, @PathVariable final String roleName) {
    return userService.removeRoleFromUserByUserName(username, roleName);
  }

  @DeleteMapping(value = "roles/{roleName}/users/{username}")
  public RoleDto removeUserFromRoleByUserName(@PathVariable final String roleName, @PathVariable final String username) {
    return userService.removeUserFromRoleByUserName(roleName, username);
  }


  @GetMapping(value = "users")
  public List<UserDto> getUsersIfAdmin() {
    return userService.getUsersAuthorized();
  }

  @PostMapping(value = "users", consumes = APPLICATION_JSON_VALUE)
  public UserDto registerUser(@RequestBody final UserDto userDto) {
    return userService.registerNewUserAccount(userDto);
  }

  @GetMapping(value = "users/table/{tablename}")
  public List<String> getTableUsers(@PathVariable final String tablename) {
    return userService.getTableUsers(tablename);
  }


  @DeleteMapping(value = "users/{username}")
  public boolean removeUser(@PathVariable final String username) {
    userService.removeUser(username);
    return true;
  }

  @GetMapping(value = "roles/user/{username}")
  public List<String> getUserRoles(@PathVariable final String username) {
    return userService.getRolesByUsername(username);
  }
}
