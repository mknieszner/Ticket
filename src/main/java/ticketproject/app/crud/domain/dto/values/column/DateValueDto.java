package ticketproject.app.crud.domain.dto.values.column;


import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ticketproject.app.crud.domain.dto.serializer.LocalDateDeserializer;
import ticketproject.app.crud.domain.dto.serializer.LocalDateSerializer;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.DateValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@JsonTypeName(ColumnType.DT)
public class DateValueDto extends ColumnValueDto {
    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDateTime value;

    public DateValueDto(final LocalDateTime value) {
        super(ColumnType.Types.DT);
        this.value = value;
    }

    public DateValueDto() {
        super(ColumnType.Types.DT);
    }

    @Override
    public ColumnValue mapThisToColumnValue() {
        return new DateValue(value);
    }
}

