package ticketproject.app.crud.domain.entities.authorization;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ROLES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @ManyToMany
  @JoinTable (
      name = "USERS_ROLES",
      joinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")},
      inverseJoinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")}
  )
  private Set<User> users = new HashSet<>();

  @Column(name = "NAME", unique = true)
  private String name;

  @Column(name = "DESCRIPTION")
  private String description;

  public Role(final String name, final String description) {
    this.name = name;
    this.description = description;
  }

  public Role(final String name) {
    this.name = name;
  }

  public void addUser(User user) {
    user.getRoles().add(this);
    users.add(user);
  }

  public void removeUserWARN(User user) {
    users.remove(user);
    user.getRoles().remove(this);
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    final Role role = (Role) o;

    return name.equals(role.name);
  }

  @Override
  public int hashCode() {
    return name.hashCode();
  }
}
