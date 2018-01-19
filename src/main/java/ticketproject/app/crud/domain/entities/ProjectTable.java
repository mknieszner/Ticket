package ticketproject.app.crud.domain.entities;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@NamedQuery(
    name = "ProjectTable.findValuesById",
    query = "FROM ProjectTable p " +
//        "JOIN FETCH p.rows " +
        "WHERE id = :TABLE_ID"

)
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString
@Table(name = "TABLES")
public class ProjectTable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String name;

  @OneToMany(
      fetch = FetchType.LAZY,
      cascade = CascadeType.ALL,
      mappedBy = "projectTable"
  )
  @Column(nullable = false)
  List<Row> rows = new ArrayList<>();

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @OrderColumn
  public List<ColumnDetail> columnDetails = new ArrayList<>();

  @NotNull
  @ManyToOne(
      fetch = FetchType.EAGER,
      cascade = CascadeType.ALL
  )
  @JoinColumn(name = "PROJECT_ID")
  private Project project;

  public ProjectTable(final Long id, final String name, final List<Row> rows) {
    this.id = id;
    this.name = name;
    rows.forEach(row -> row.setProjectTable(this));
    this.rows.addAll(rows);
  }

  public ProjectTable(final String name,
                      final List<ColumnDetail> columnDetails) {
    this.name = name;
    this.columnDetails.addAll(columnDetails);
  }

  public void addProject(final Project project) {
    project.getProjectTables().add(this);
    this.project = project;
  }

  @Override
  public String toString() {
    return "ProjectTable{" + "id=" + id + ", name='" + name + '\''
        + ", rows=" + rows + ", project="
//      + project.getId()
        + '}';
  }
}

