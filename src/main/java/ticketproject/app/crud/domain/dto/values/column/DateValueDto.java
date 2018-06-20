package ticketproject.app.crud.domain.dto.values.column;


import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import lombok.*;
import ticketproject.app.crud.domain.entities.types.ColumnValue;
import ticketproject.app.crud.domain.entities.types.DateValue;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

class LocalDateDeserializer extends StdDeserializer<LocalDateTime> {

  private static final long serialVersionUID = 1L;

  protected LocalDateDeserializer() {
    super(LocalDateTime.class);
  }


  @Override
  public LocalDateTime deserialize(JsonParser jp, DeserializationContext ctxt)
          throws IOException, JsonProcessingException {
    return LocalDateTime.parse(jp.readValueAs(String.class), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
  }

}

class LocalDateSerializer extends StdSerializer<LocalDateTime> {

  private static final long serialVersionUID = 1L;

  public LocalDateSerializer(){
    super(LocalDateTime.class);
  }

  @Override
  public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider sp) throws IOException, JsonProcessingException {
    gen.writeString(value.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")));
  }
}
