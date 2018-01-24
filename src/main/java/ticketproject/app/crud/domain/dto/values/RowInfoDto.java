package ticketproject.app.crud.domain.dto.values;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RowInfoDto {
  private Long id;
  private String name;
  private String createdBy;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
  private Date createdOn;
  private String lastModifiedBy;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
  private Date lastModifiedOn;
}
