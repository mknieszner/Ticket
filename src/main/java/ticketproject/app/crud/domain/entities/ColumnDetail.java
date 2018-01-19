package ticketproject.app.crud.domain.entities;

import lombok.*;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.entities.types.Option;

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

  //"IN" "EN" "DE" "DT" "ST"
  private String type;

  @OneToMany
  @Cascade(org.hibernate.annotations.CascadeType.ALL)
  @OrderColumn
  List<Option> optionList = new ArrayList<>();

  public ColumnDetail(final String name, final String type, final List<Option> optionList) {
    this.name = name;
    this.type = type;
    this.optionList.addAll(optionList);
  }
}
