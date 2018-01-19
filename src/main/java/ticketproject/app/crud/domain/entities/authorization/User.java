package ticketproject.app.crud.domain.entities.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "USERNAME", unique = true)
  private String username;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private boolean enabled;
  @ManyToMany(
      mappedBy = "users",
      fetch = FetchType.EAGER
  )
  Set<Role> roles = new HashSet<>();

  public User(final String username, final String firstName, final String lastName, final String email, final String password, final boolean enabled) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.enabled = enabled;
  }

  public User(final String username) {

  }

  public void addRole(Role role) {
    role.getUsers().add(this);
    roles.add(role);
  }

  public void removeRoleWARN(Role role) {
    roles.remove(role);
    role.getUsers().remove(this);
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    final User user = (User) o;

    return username.equals(user.username);
  }

  @Override
  public int hashCode() {
    return username.hashCode();
  }

  @Override
  public String toString() {
    return "User{" + "id=" + id + ", username='" + username + '\'' + ", firstName='" + firstName + '\'' + ", lastName='" + lastName + '\'' + ", email='" +
        email + '\'' + ", password='" + password + '\'' + ", enabled=" + enabled + ", roles=" + roles.stream().map(Role::getName).collect(Collectors.toList()) + '}';
  }
}
