package ticketproject.app.crud.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.column.*;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.domain.entities.ProjectTable;

import ticketproject.app.crud.domain.entities.types.Option;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkArgument;

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
    validateValues(columnDetailList,columnValues);
  }

  private void validateValues(final List<ColumnDetail> columnDetailList, final List<ColumnValueDto> columnValues) {

    checkArgument(columnDetailList.size() == columnValues.size(),"Incompatible size of row!" + columnDetailList.size() + " " + columnValues.size());
    for (int i = 0; i < columnDetailList.size(); i++) {
      checkArgument(validateValue(columnDetailList.get(i),columnValues.get(i)),"Unsupported value");
    }
  }

  //AVAILABLE VALUES : "IN" "EN" "DE" "DT" "ST"
  private boolean validateValue(final ColumnDetail columnDetail, final ColumnValueDto columnValueDto) {
    switch (columnDetail.getType()) {
      case ("IN"): {
        System.out.println("wewn: IN" + columnValueDto.getClass());
        checkArgument(columnValueDto instanceof IntValueDto,"This value should be INT");
        return true;
      }
      case ("EN"): {
        checkArgument(columnValueDto instanceof EnumValueDto);
        checkArgument(columnDetail.getOptionList()
              .stream()
              .map(Option::getValue)
              .collect(Collectors.toList())
              .contains(((EnumValueDto) columnValueDto).getValue()),"Unsupported option value >" + ((EnumValueDto) columnValueDto).getValue() + '<');
        return true;
      }
      case ("DE"): {
        checkArgument(columnValueDto instanceof DescriptionValueDto,"This value should be DE");
        return true;
      }
      case ("DT"): {
        checkArgument(columnValueDto instanceof DateValueDto,"This value should be DT");
        return true;
      }
      case ("ST"): {
        checkArgument(columnValueDto instanceof ShortTextValueDto, "This value should be ST");
        return true;
      }
    }
    return true;
  }
}
