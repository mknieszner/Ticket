//package ticketproject.app.crud.domain;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//import ticketproject.app.crud.domain.Dto.definition.ColumnDetailDefinitionDto;
//import ticketproject.app.crud.domain.Dto.definition.ProjectDefinitionDto;
//import ticketproject.app.crud.domain.Dto.definition.TableDefinitionDto;
//import ticketproject.app.crud.domain.Dto.values.ProjectDto;
//import ticketproject.app.crud.domain.Dto.values.ProjectTableDto;
//import ticketproject.app.crud.domain.Dto.values.RowDto;
//import ticketproject.app.crud.domain.Dto.values.column.DateValueDto;
//import ticketproject.app.crud.domain.Dto.values.column.DescriptionValueDto;
//import ticketproject.app.crud.domain.Dto.values.column.EnumValueDto;
//import ticketproject.app.crud.domain.Dto.values.column.IntValueDto;
//import ticketproject.app.crud.domain.entities.types.Option;
//import ticketproject.app.crud.service.DbService;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class DataBaseTestSuite {
//
//  @Autowired
//  private DbService dbService;
//
//  @Test
//  public void addTableByProjetId(){
//    dbService.addTableByProjectId(getTestProject().getProjectTableDtos().get(0), 1L);
//  }
//
//
//  private ProjectDefinitionDto getTestProjectDefinition() {
//    ColumnDetailDefinitionDto columnDetailDefinitionDto1 = new ColumnDetailDefinitionDto("int1", "IN");
//    ColumnDetailDefinitionDto columnDetailDefinitionDto2 = new ColumnDetailDefinitionDto("Date1", "DT");
//    ColumnDetailDefinitionDto columnDetailDefinitionDto3 = new ColumnDetailDefinitionDto("int2", "IN2");
//    List<Option> yesNoList = new ArrayList<>();
//    yesNoList.add(new Option("Yes"));
//    yesNoList.add(new Option("No"));
//    ColumnDetailDefinitionDto columnDetailDefinitionDto4 = new ColumnDetailDefinitionDto("ENUM Y/N", "EN", yesNoList);
//    ColumnDetailDefinitionDto columnDetailDefinitionDto5 = new ColumnDetailDefinitionDto("Short1", "ST");
//    List<ColumnDetailDefinitionDto> columnDetailDefinitionDtos = new ArrayList<>();
//    columnDetailDefinitionDtos.add(columnDetailDefinitionDto1);
//    columnDetailDefinitionDtos.add(columnDetailDefinitionDto2);
//    columnDetailDefinitionDtos.add(columnDetailDefinitionDto3);
//    columnDetailDefinitionDtos.add(columnDetailDefinitionDto4);
//    columnDetailDefinitionDtos.add(columnDetailDefinitionDto5);
//    TableDefinitionDto tableDefinitionDto = new TableDefinitionDto(null,"TABLE1", columnDetailDefinitionDtos);
//    ProjectDefinitionDto projectDefinitionDto;
//    List<TableDefinitionDto> tableDefinitionDtos = new ArrayList<>();
//    tableDefinitionDtos.add(tableDefinitionDto);
//    projectDefinitionDto = new ProjectDefinitionDto("PROJECT1", tableDefinitionDtos);
//    return projectDefinitionDto;
//  }
//
//    private ProjectDto getTestProject() {
//    RowDto rowDto = new RowDto(null,"Definition Row",new ArrayList<>());
//    rowDto.addColumnValue(new IntValueDto(0));
//    rowDto.addColumnValue(new IntValueDto(0));
//    rowDto.addColumnValue(new DateValueDto(new Date()));
//    rowDto.addColumnValue(new DescriptionValueDto("First Description"));
//    rowDto.addColumnValue(new EnumValueDto("Status"));
//    List<RowDto> rowDtos =new ArrayList<>();
//    rowDtos.add(rowDto);
//    ProjectTableDto projectTableDto = new ProjectTableDto(null,"project 1 first table", rowDtos);
//    System.out.println("TEST TABLE: "+ projectTableDto);
//    List<ProjectTableDto> projectTableDtos = new ArrayList<>();
//    projectTableDtos.add(projectTableDto);
//    ProjectDto projectDto = new ProjectDto(null,"project 1",projectTableDtos);
//    System.out.println("TEST PROJECT: "+ projectDto);
//    return projectDto;
//  }
//}
