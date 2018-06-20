package ticketproject.app.crud.domain.entities.types;


import lombok.*;
import org.hibernate.annotations.Cascade;
import ticketproject.app.crud.domain.dto.values.column.EnumValueDto;
import ticketproject.app.crud.service.helper.ColumnType;

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
@DiscriminatorValue(ColumnType.EN)
public class EnumValue extends ColumnValue {

  @NotNull
  @Column(name = "ENUM_VALUE")
  String value;

  @Override
  public EnumValueDto mapThisToColumnValueDto(){
    return new EnumValueDto(value);
  }
}
