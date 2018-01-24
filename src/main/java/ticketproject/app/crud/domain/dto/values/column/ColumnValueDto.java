package ticketproject.app.crud.domain.dto.values.column;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.*;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.WRAPPER_OBJECT, property = "type"
)

@JsonSubTypes({
    @JsonSubTypes.Type(value = ShortTextValueDto.class, name = "ST"),
    @JsonSubTypes.Type(value = IntValueDto.class, name = "IN"),
    @JsonSubTypes.Type(value = EnumValueDto.class, name = "EN"),
    @JsonSubTypes.Type(value = DescriptionValueDto.class, name = "DE"),
    @JsonSubTypes.Type(value = DateValueDto.class, name = "DT")
})
@Getter
@Setter
@AllArgsConstructor
@ToString
//@NoArgsConstructor
public class ColumnValueDto {
  //private String typeName;
}
