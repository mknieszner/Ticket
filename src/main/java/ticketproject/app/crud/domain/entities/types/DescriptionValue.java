package ticketproject.app.crud.domain.entities.types;

import lombok.*;
import ticketproject.app.crud.domain.dto.values.column.DescriptionValueDto;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@DiscriminatorValue(ColumnType.DE)
public class DescriptionValue extends ColumnValue {

    @NotNull
    @Column(name = "DESCIPTION_VALUE", length = 1000)
    String value;

    public DescriptionValue(final String value) {
        this.value = value;
    }

    @Override
    public DescriptionValueDto mapThisToColumnValueDto(){
        return new DescriptionValueDto(value);
    }
}