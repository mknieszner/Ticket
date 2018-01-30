package ticketproject.app.crud.domain.entities.types;

import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
//@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//@AttributeOverride(
//    name = "SHORT_TEXT_NAME",
//    column = @Column(name = "COLUMN_NAME", nullable = false)
//)
@DiscriminatorValue("DE")
public class DescriptionValue extends ColumnValue {

  @NotNull
  @Column(name = "DESCIPTION_VALUE",length = 1000)
  String value;
  public DescriptionValue(
     // final String typeName,
      final String value) {
    //super(typeName);
    this.value = value;
  }
}