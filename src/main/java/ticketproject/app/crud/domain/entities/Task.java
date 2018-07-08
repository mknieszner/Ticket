package ticketproject.app.crud.domain.entities;

import lombok.*;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.entities.authorization.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.hibernate.annotations.CascadeType.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TASK")
@ToString
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long tableId;

  private String name;

  private String description;

  @Enumerated(EnumType.STRING)
  private Status status;

  @ManyToMany(
      fetch = FetchType.EAGER
  )
  @JoinTable(
      name = "USER_TASK",
      joinColumns = { @JoinColumn(name = "USER_id") },
      inverseJoinColumns = { @JoinColumn(name = "TASK_id") }
  )
  @Cascade(value = {PERSIST, MERGE, REFRESH})
  private Set<User> users = new HashSet<>();

  @OneToMany(
      fetch = FetchType.EAGER
  )
  @OrderColumn
  @Cascade(value = {PERSIST, MERGE, REFRESH})
  List<Task> tasks = new ArrayList<>();

  //TODO: adding attachments
  //List<Blob> artifacts;

  public enum Status {
    UNASSIGNED, ASSIGNED, IN_PROGRESS, DONE,
  }
}
