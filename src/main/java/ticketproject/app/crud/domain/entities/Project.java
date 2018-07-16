package ticketproject.app.crud.domain.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ticketproject.app.crud.service.DatabaseEnvironment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@ToString
@Table(name = "PROJECTS")
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @NotNull
  @OneToMany(
      fetch = FetchType.EAGER,
      cascade = CascadeType.ALL,
      mappedBy = "project"
  )
  @Column(nullable = false)
  List<ProjectTable> projectTables = new ArrayList<>();

  @Column
  @Enumerated(value = EnumType.STRING)
  @NotNull
  private DatabaseEnvironment.Environments databaseEnvironment;

  public Project(final Long id,
                 final String name,
                 final List<ProjectTable> projectTables,
                 DatabaseEnvironment.Environments databaseEnvironment) {
    this.id = id;
    this.name = name;
    projectTables.forEach(projectTable -> projectTable.setProject(this));
    this.projectTables.addAll(projectTables);
    this.databaseEnvironment = databaseEnvironment;
  }
}
