package ticketproject.app.crud.domain.dto.values;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import ticketproject.app.crud.domain.dto.serializer.LocalDateDeserializer;
import ticketproject.app.crud.domain.dto.serializer.LocalDateSerializer;
import ticketproject.app.crud.domain.dto.values.column.ColumnValueDto;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RowDto {
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    @Singular
    private List<ColumnValueDto> columnValueDtos;
    @NotNull
    @Singular
    private List<TaskDto> taskDtos;
    @NotNull
    private String createdBy;
    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDateTime createdOn;
    @NotNull
    private String lastModifiedBy;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @NotNull
    private LocalDateTime lastModifiedOn;

    public RowDtoBuilder updateWithfModificationInfo(RowDto rowDto) {
        return RowDto.builder()
                .id(rowDto.getId())
                .name(rowDto.getName())
                .columnValueDtos(rowDto.getColumnValueDtos())
                .taskDtos(rowDto.getTaskDtos())
                .createdOn(rowDto.getCreatedOn())
                .createdBy(rowDto.getCreatedBy());

    }

    public static RowDtoBuilder updateWithCreationAnfModificationInfo(RowDto rowDto) {
        return RowDto.builder()
                .id(rowDto.getId())
                .name(rowDto.getName())
                .columnValueDtos(rowDto.getColumnValueDtos())
                .taskDtos(rowDto.getTaskDtos());

    }

    public static RowDto addTask(RowDto rowDto, final TaskDto taskDto) {
        return RowDto.builder()
                .id(rowDto.getId())
                .name(rowDto.getName())
                .columnValueDtos(rowDto.getColumnValueDtos())
                .taskDtos(rowDto.getTaskDtos())
                .createdOn(rowDto.getCreatedOn())
                .createdBy(rowDto.getCreatedBy())
                .taskDto(taskDto)
                .build();
    }

    public static  RowDto addTasks(RowDto rowDto, List<TaskDto> taskDto) {
        return RowDto.builder()
                .id(rowDto.getId())
                .name(rowDto.getName())
                .columnValueDtos(rowDto.getColumnValueDtos())
                .taskDtos(rowDto.getTaskDtos())
                .createdOn(rowDto.getCreatedOn())
                .createdBy(rowDto.getCreatedBy())
                .taskDtos(taskDto)
                .build();
    }
}