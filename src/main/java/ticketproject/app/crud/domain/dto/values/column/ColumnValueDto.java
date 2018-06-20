package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.*;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.service.helper.ColumnType;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.WRAPPER_OBJECT, property = "type"
)

@JsonSubTypes({
    @JsonSubTypes.Type(value = ShortTextValueDto.class, name = ColumnType.ST),
    @JsonSubTypes.Type(value = IntValueDto.class, name = ColumnType.IN),
    @JsonSubTypes.Type(value = EnumValueDto.class, name = ColumnType.EN),
    @JsonSubTypes.Type(value = DescriptionValueDto.class, name = ColumnType.DE),
    @JsonSubTypes.Type(value = DateValueDto.class, name = ColumnType.DT)
})
@Getter
@Setter
@AllArgsConstructor
@ToString
public abstract class ColumnValueDto {
  private ColumnType.Types columnType;
  public abstract Object getValue();
  public abstract ColumnValue mapThisToColumnValue();
}
