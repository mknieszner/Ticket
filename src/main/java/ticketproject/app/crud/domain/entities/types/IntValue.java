package ticketproject.app.crud.domain.entities.types;

import lombok.*;
import ticketproject.app.crud.domain.dto.values.column.IntValueDto;
import ticketproject.app.crud.service.helper.ColumnType;

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
@DiscriminatorValue(ColumnType.IN)
public class IntValue extends ColumnValue {

    @NotNull
    @Column(name = "INT_VALUE")
    private Integer value;

    @Override
    public IntValueDto mapThisToColumnValueDto(){
        return new IntValueDto(value);
    }
}
