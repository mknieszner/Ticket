package ticketproject.app.crud.domain.entities.types;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "OPTIONS")
public class Option {

  @Id
  @GeneratedValue
  @Column(name = "OPTION_ID", unique = true)
  private Long id;

  @NotNull
  @Column
  private String value;

  public Option(String value) {
    this.value = value;
  }


//  @ManyToMany
//  @JoinTable(
//      name = "JOIN_OPTION_TYPE",
//      joinColumns = {@JoinColumn(name = "OPTION_ID", referencedColumnName = "OPTION_ID")},
//      inverseJoinColumns = {@JoinColumn(name = "TYPE_ID", referencedColumnName = "TYPE_ID")}
//      )
//  List<EnumType> typeList = new ArrayList<>();

//  public void addType(final EnumType type) {
//    type.optionList.add(this);
//    typeList.add(type);
//  }
}
