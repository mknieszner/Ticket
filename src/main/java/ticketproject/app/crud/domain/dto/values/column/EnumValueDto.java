package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.EnumValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName(ColumnType.EN)
public class EnumValueDto extends ColumnValueDto {
    @NotNull
    private String value;

    public EnumValueDto(final String value) {
        super(ColumnType.Types.EN);
        this.value = value;

    }

    public EnumValueDto() {
        super(ColumnType.Types.EN);
    }

    @Override
    public ColumnValue mapThisToColumnValue() {
        return new EnumValue(value);
    }
}
