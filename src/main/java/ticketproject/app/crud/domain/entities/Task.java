package ticketproject.app.crud.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.entities.authorization.User;

import javax.persistence.*;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TASK")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

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
  private List<User> users = new ArrayList<>();

  @OneToMany(
      fetch = FetchType.EAGER
  )
  @OrderColumn
  List<Task> tasks = new ArrayList<>();

  //TODO: adding attachments
  //List<Blob> artifacts;

  public enum Status {
    UNASSIGNED, ASSIGNED, IN_PROGRESS, DONE,
  }
}
