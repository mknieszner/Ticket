package ticketproject.app.crud.domain.entities;

import lombok.*;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.entities.types.ColumnValue;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ROWS")
public class Row {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  //@Column(unique = true)
  private String name;

  private String createdBy;

  private Date createdOn;

  private String lastModifiedBy;

  private Date lastModifiedOn;

  public Row(final String name) {
    this.name = name;
  }

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  @OrderColumn
  public List<ColumnValue> columnValues = new ArrayList<>();

  @NotNull
  @ManyToOne(
      //fetch = FetchType.EAGER
  )
  @JoinColumn(name = "TABLES_ID")
  private ProjectTable projectTable;



  public Row(final Long id, final String name, final List<ColumnValue> columnValues, final List<Task> tasks) {
    this.id = id;
    this.name = name;
    this.columnValues.addAll(columnValues);
    this.tasks.addAll(tasks);
  }

  @Override
  public String toString() {
    return "Row{" + "id=" + id + ", name='" + name + '\'' + ", columnValues=" + columnValues + ", projectTable=" + projectTable.getId() + '}';
  }

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  @OrderColumn
  List<Task> tasks = new ArrayList<>();
}
