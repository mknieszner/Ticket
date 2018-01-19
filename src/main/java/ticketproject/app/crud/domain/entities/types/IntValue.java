package ticketproject.app.crud.domain.entities.types;

import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//@AttributeOverride(
//    name = "INT_NAME",
//    column = @Column(name = "COLUMN_NAME", nullable = false)
//)
@DiscriminatorValue("IN")
public class IntValue extends ColumnValue {

  @NotNull
  @Column(name = "INT_VALUE")
  private Integer value;

//  public IntValue(
//   //   final String typeName,
//      final Integer value) {
//   // super(typeName);
//    this.value = value;
//  }
}
