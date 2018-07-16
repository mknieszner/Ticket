package ticketproject.app.crud.domain.entities.authorization;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static org.hibernate.annotations.CascadeType.MERGE;
import static org.hibernate.annotations.CascadeType.PERSIST;
import static org.hibernate.annotations.CascadeType.REFRESH;

@Entity
@Table(name = "ROLES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "name")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "USERS_ROLES",
            joinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")}
    )
    @Cascade(value = {PERSIST, MERGE, REFRESH})
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

    @PreRemove
    public void removeAllUsers() {
        for (User user : users) {
            user.getRoles().remove(this);
        }
    }
}
