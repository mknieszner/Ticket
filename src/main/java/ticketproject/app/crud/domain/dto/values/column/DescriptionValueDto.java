package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.DescriptionValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName(ColumnType.DE)
public class DescriptionValueDto extends ColumnValueDto {
    @NotNull
    String value;

    public DescriptionValueDto(final String value) {
        super(ColumnType.Types.DE);
        this.value = value;
    }

    public DescriptionValueDto() {
        super(ColumnType.Types.DE);
    }


    @Override
    public ColumnValue mapThisToColumnValue() {
        return new DescriptionValue(value);
    }
}
