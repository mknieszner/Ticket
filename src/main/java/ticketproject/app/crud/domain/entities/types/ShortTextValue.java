package ticketproject.app.crud.domain.entities.types;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//@AttributeOverride(
//    name = "SHORT_TEXT_NAME",
//    column = @Column(name = "COLUMN_NAME", nullable = false)
//)
@DiscriminatorValue("ST")
public class ShortTextValue extends ColumnValue {

  @NotNull
  @Column(name = "SHORTTEXT_VALUE")
  String value;

//  public ShortTextValue(
//   //   final String typeName,
//      final String value) {
//   // super(typeName);
//    this.value = value;
//  }
}
