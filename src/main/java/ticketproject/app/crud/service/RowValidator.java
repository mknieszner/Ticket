package ticketproject.app.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.column.*;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.domain.entities.ProjectTable;

import ticketproject.app.crud.domain.entities.types.Option;
import ticketproject.app.crud.service.helper.ColumnType;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;
import static ticketproject.app.crud.service.helper.ColumnType.Types.IN;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RowValidator {
    private final ProjectTableRepository projectTableRepository;

    public void validateRows(final Long tableId, final List<RowDto> rowDtos) {
        rowDtos.forEach(rowDto -> validateRow(tableId, rowDto));
    }

    public void validateRow(final Long tableId, final RowDto rowDto) {
        ProjectTable projectTable = projectTableRepository.findOne(tableId);

        List<ColumnDetail> columnDetailList = projectTable.getColumnDetails();
        List<ColumnValueDto> columnValues = rowDto.getColumnValueDtos();
        validateValues(columnDetailList, columnValues);
    }

    private void validateValues(final List<ColumnDetail> columnDetailList, final List<ColumnValueDto> columnValues) {

        checkArgument(columnDetailList.size() == columnValues.size(), "Incompatible size of row!" + columnDetailList.size() + " " + columnValues.size());
        for (int i = 0; i < columnDetailList.size(); i++) {
            checkArgument(validateValue(columnDetailList.get(i), columnValues.get(i)), "Unsupported value");
        }
    }

    private boolean validateValue(final ColumnDetail columnDetail, final ColumnValueDto columnValueDto) {
        checkArgument(columnDetail.getType().equals(columnValueDto.getColumnType()),
                "Types columnDetail[%s] and columnValueDto[%s] are not equal",
                columnDetail.getType(), columnValueDto.getColumnType());
        return true;
    }
}
