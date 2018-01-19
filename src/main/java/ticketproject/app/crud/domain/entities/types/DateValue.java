package ticketproject.app.crud.domain.entities.types;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
//@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//@AttributeOverride(
//    name = "DATE_NAME",
//    column = @Column(name = "COLUMN_NAME", nullable = false)
//)
@DiscriminatorValue("DT")
public class DateValue extends ColumnValue {

  @NotNull
  @Column(name = "DATE_VALUE")
  Date value;

  public DateValue(
      //final String typeName,
      final Date value) {
    //super(typeName);
    this.value = value;
  }
}
