package ticketproject.app.crud.domain.entities.types;

import lombok.*;
import ticketproject.app.crud.domain.dto.values.column.ShortTextValueDto;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@DiscriminatorValue(ColumnType.ST)
public class ShortTextValue extends ColumnValue {

  @NotNull
  @Column(name = "SHORTTEXT_VALUE")
  String value;

  @Override
  public ShortTextValueDto mapThisToColumnValueDto(){
    return new ShortTextValueDto(value);
  }
}
