package ticketproject.app.crud.domain.Dto.values.column;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@JsonTypeName("EN")
@NoArgsConstructor
public class EnumValueDto extends ColumnValueDto {
  @NotNull
  private String value;
  //private List<Option> optionList = new ArrayList<>();

  public EnumValueDto(
      //final String typeName,
      final String value
  //  ,final List<Option> optionList
      ) {
  //  super(typeName);
    this.value = value;
//    this.optionList.addAll(new ArrayList<>(optionList));
  }
}
