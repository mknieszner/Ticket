package ticketproject.app.crud.domain.entities;

import lombok.*;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.entities.types.Option;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "COLUMN_DETAILS")
public class ColumnDetail {
  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @Enumerated(EnumType.STRING)
  private ColumnType.Types type;

  @OneToMany
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  @OrderColumn
  List<Option> optionList = new ArrayList<>();

  public ColumnDetail(final String name, final ColumnType.Types type, final List<Option> optionList) {
    this.name = name;
    this.type = type;
    this.optionList.addAll(optionList);
  }
}
