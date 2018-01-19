package ticketproject.app.crud.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
      cascade = CascadeType.PERSIST,
      mappedBy = "project"
  )
  @Column(nullable = false)
  List<ProjectTable> projectTables = new ArrayList<>();

  public Project(final Long id, final String name, final List<ProjectTable> projectTables) {
    this.id = id;
    this.name = name;
    projectTables.forEach(projectTable -> projectTable.setProject(this));
    this.projectTables.addAll(projectTables);
  }

  //  public Project(final String name) {
//    this.name = name;
//  }
//
//  public Project(final String name, final List<ProjectTable> projectTables) {
//    this.name = name;
//    this.projectTables.addAll(projectTables);
//  }
//
  public void addProjectTable(final ProjectTable projectTable) {
    this.projectTables.add(projectTable);
    projectTable.setProject(this);
  }
//
//  public void addProjectTables(final List<ProjectTable> projectTables) {
//    this.projectTables.addAll(projectTables);
//  }
}
