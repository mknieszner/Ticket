package ticketproject.app.crud.domain.Dto.values;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import ticketproject.app.crud.domain.Dto.values.column.ColumnValueDto;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RowDto {
  @NotNull
  private Long id;
  @NotNull
  private String name;
  @NotNull
  private List<ColumnValueDto> columnValueDtos = new ArrayList<>();
  @NotNull
  private String createdBy;
  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
  private Date createdOn;
  @NotNull
  private String lastModifiedBy;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
  @NotNull
  private Date lastModifiedOn;

  public void addColumnValue(final ColumnValueDto columnValueDto) {
    this.columnValueDtos.add(columnValueDto);
  }
}