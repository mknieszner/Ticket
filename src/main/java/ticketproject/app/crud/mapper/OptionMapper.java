package ticketproject.app.crud.mapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.domain.dto.values.column.OptionDto;
import ticketproject.app.crud.domain.entities.types.Option;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Getter
@AllArgsConstructor
public class OptionMapper {
  public List<OptionDto> mapToOptionDtoList(final List<Option> options) {
    return options
        .stream()
        .map(this::mapToOptionDto)
        .collect(Collectors.toList());
  }

  public List<Option> mapToOptionList(final List<OptionDto> optionDtos) {
    return optionDtos
        .stream()
        .map(this::mapToOption)
        .collect(Collectors.toList());
  }

  public Option mapToOption(final OptionDto optionDto) {
    return new Option(optionDto.getValue());
  }

  public OptionDto mapToOptionDto(final Option option) {
    return new OptionDto(option.getValue());
  }
}
