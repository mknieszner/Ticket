package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ticketproject.app.crud.domain.Dto.authorization.RoleDto;
import ticketproject.app.crud.domain.Dto.authorization.UserDto;
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

//  @GetMapping(value = "users/{username}/roles")//////////////////??????????????????????????////////////////////
//  public List<String> getUserRoles(final Principal principal, HttpServletRequest request
//  ) {
//    request.isUserInRole("ADMIN");
//    System.out.println("USERNAME" + principal.getName());
//    return dbService.getUsersRoles(principal.getName());
//  }

  @GetMapping(value = "roles/details")
  public List<RoleDto> getFullRolesAuthorized(final Principal principal) {
    return userService.getFullRolesAuthorized(principal.getName());
  }

  @GetMapping(value = "roles")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public List<String> getAllRoleNames(final Principal principal) {
    return userService.getAllRoleNamesAuthorized(principal.getName());
  }

  @PostMapping(value = "roles/{roleName}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public RoleDto createRole(@PathVariable final String roleName, @RequestBody final String roleDescription) {
    return userService.createRole(roleName, roleDescription);
  }

  @GetMapping(value = "roles/{roleName}")
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN',#roleName)")
  public RoleDto getRoleByRoleName(@PathVariable final String roleName) {
    return userService.getRoleByRoleName(roleName);
  }

  @DeleteMapping(value = "roles/{roleName}")
  public boolean deleteRoleByRoleName(@PathVariable final String roleName) {
    userService.deleteRoleByRoleName(roleName);
    return true;
  }

  @GetMapping(value = "users/{username}")
  public UserDto getUserByUsername(@PathVariable final String username, final Principal principal) {
    return userService.getSingleUserByUsername(username);
  }

  @PostMapping(value = "users/{username}/roles/{roleName}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public UserDto addRoleToUserByUserName(@PathVariable final String username, @PathVariable final String roleName) {
    //public UserDto addRoleToUserByUserName(@PathVariable final String username, @RequestBody final String roleName) {
    return userService.addRoleToUserByUserName(username, roleName);
  }

  @PostMapping(value = "roles/{roleName}/users/{username}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public UserDto addUserToRoleByRoleName(@PathVariable final String roleName, @PathVariable final String username) {
    //public UserDto addRoleToUserByUserName(@PathVariable final String username, @RequestBody final String roleName) {
    return userService.addRoleToUserByUserName(username, roleName);//TODO: DO POPRAWY NAZEWNICTWO SKOPIOWANE Z INNEJ FUNKCJI
  }

  @DeleteMapping(value = "users/{username}/roles/{roleName}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public UserDto removeRoleFromUserByUserName(@PathVariable final String username, @PathVariable final String roleName) {
    //public UserDto addRoleToUserByUserName(@PathVariable final String username, @RequestBody final String roleName) {
    return userService.removeRoleFromUserByUserName(username, roleName);
  }

  @DeleteMapping(value = "roles/{roleName}/users/{username}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public RoleDto removeUserFromRoleByUserName(@PathVariable final String roleName, @PathVariable final String username) {
    return userService.removeUserFromRoleByUserName(roleName, username);
  }


  @GetMapping(value = "users")
  public List<UserDto> getUsersIfAdmin(final Principal principal) {
    return userService.getUsersAuthorized(principal.getName());
  }

  //  @GetMapping(value = "users")
//  public List<UserDto> getUsers(final Principal principal) {
//    return userService.getUserByUsername(principal.getName());
//  }

  @PostMapping(value = "users", consumes = APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public UserDto registerUser(@RequestBody final UserDto userDto) {
    return userService.registerNewUserAccount(userDto);
    //return dbService.createUser(userDto);
  }


  @DeleteMapping(value = "users/{username}")
  @PreAuthorize("hasAuthority('ROLE_ADMIN')")
  public boolean removeUser(@PathVariable final String username) {
    userService.removeUser(username);
    return true;
  }

  @GetMapping(value = "roles/user/{username}")
  public List<String> getUserRoles(@PathVariable final String username) {
    return userService.getRolesByUsername(username);
  }
}
