package ticketproject.app.crud.domain.entities.types;


import lombok.*;
import org.hibernate.annotations.Cascade;

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
//@AttributeOverride(
//    name = "ENUM_NAME",
//    column = @Column(name = "COLUMN_NAME", nullable = false)
//)
@DiscriminatorValue("EN")
public class EnumValue extends ColumnValue {

  @NotNull
  @Column(name = "ENUM_VALUE")
  String value;

//  @OneToMany
//  @Cascade(org.hibernate.annotations.CascadeType.ALL)
//  @OrderColumn
//  List<Option> optionList = new ArrayList<>();

//  public EnumValue(final List<Option> options) {
//    optionList.addAll(options);
//  }

//  public EnumValue(
//    //  final String typeName,
//      final String value
//  ) {
//  //  super(typeName);
//    this.value = value;
//  }

//  public EnumValue(
//    //  final String typeName,
//      final String value
//    //  , final List<Option> optionList
//  ) {
//  //  super(typeName);
//    this.value = value;
//    //this.optionList = optionList;
//  }
}
