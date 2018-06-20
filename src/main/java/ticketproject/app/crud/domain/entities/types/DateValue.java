package ticketproject.app.crud.domain.entities.types;

import lombok.*;
import ticketproject.app.crud.domain.dto.values.column.ColumnValueDto;
import ticketproject.app.crud.domain.dto.values.column.DateValueDto;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@DiscriminatorValue(ColumnType.DT)
public class DateValue extends ColumnValue {

    @NotNull
    @Column(name = "DATE_VALUE")
    LocalDateTime value;

    public DateValue(final LocalDateTime value) {
        this.value = value;
    }

    @Override
    public ColumnValueDto mapThisToColumnValueDto() {
        return new DateValueDto(value);
    }
}
