//package ticketproject.app;
//
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import ticketproject.app.crud.domain.Dto.definition.ColumnDetailDefinitionDto;
//import ticketproject.app.crud.domain.Dto.definition.ProjectDefinitionDto;
//import ticketproject.app.crud.domain.Dto.definition.TableDefinitionDto;
//import ticketproject.app.crud.domain.Dto.values.ProjectDto;
//import ticketproject.app.crud.domain.Dto.values.ProjectTableDto;
//import ticketproject.app.crud.domain.Dto.values.RowDto;
//import ticketproject.app.crud.domain.Dto.values.column.*;
//import ticketproject.app.crud.domain.entities.types.*;
//
//import java.io.IOException;
//import java.nio.charset.Charset;
//import java.security.Principal;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@AutoConfigureMockMvc
//public class ProjectTestSuite {
//
//  @Autowired
//  public MockMvc mockMvc;
//
//  @Test
//  public void defineProject() throws Exception {
//    ProjectDefinitionDto projectDefinitionDto = getTestProjectDefinition();
//    System.out.println(projectDefinitionDto);
//
//
//    mockMvc.perform(post("/v1/projects/definition")
//        .contentType(TestUtil.APPLICATION_JSON_UTF8)
//        .content(TestUtil.convertObjectToJsonBytes(projectDefinitionDto)))
//        .andDo(print()).andExpect(status().isOk());
//  }
//
//  //
//  @Test
//  public void getProjectHeaders() throws Exception {
//    ProjectDto projectDto = getTestProject();
//    System.out.println(projectDto);
//
//    mockMvc.perform(
//        get("/v1/projects/definition/1"))
//        .andDo(print())
//        .andExpect(status().isOk());
//  }
//
//  @Test
//  public void getTableHeaders() throws Exception {
//
//    mockMvc.perform(
//        get("/v1/projects/tables/definition/1"))
//        .andDo(print())
//        .andExpect(status().isOk());
//  }
////
////  @Test
////  public void getProject() throws Exception {
////    mockMvc.perform(get("/v1/projects/1"))
////        .andDo(print())
////        .andExpect(status().isOk());
////  }
////
//    @Test
//  public void addRowByTableId() throws Exception {
//    mockMvc.perform(post("/v1/projects/tables/1/row")
//        .contentType(TestUtil.APPLICATION_JSON_UTF8)
//        .content(TestUtil.convertObjectToJsonBytes(getRowDto())))
//        .andDo(print())
//        .andExpect(status()
//            .isOk());
//  }
//
//  private RowDto getRowDto() {
//    RowDto rowDto =  new RowDto();
//    rowDto.setName("row1");
//    rowDto.addColumnValue(new IntValueDto(123));
//    rowDto.addColumnValue(new DateValueDto(new Date()));
//    rowDto.addColumnValue(new IntValueDto(678));
//    rowDto.addColumnValue(new EnumValueDto("Yes"));
//    rowDto.addColumnValue(new ShortTextValueDto("Description 3"));
//    return rowDto;
//  }
////
//  @Test
//  public void addRowsByTableId() throws Exception {
//    ProjectTableDto projectTableDto = getTestTableDto();
//
//    mockMvc.perform(post("/v1/projects/tables/2/rows")
//        .contentType(TestUtil.APPLICATION_JSON_UTF8)
//        .content(TestUtil.convertObjectToJsonBytes(projectTableDto.getRowDtos())))
//        .andDo(print())
//        .andExpect(status()
//            .isOk());
//  }
////
////  @Test
////  public void updateRows() throws Exception {
////    List<RowDto> rowDtos = getTestTableDto()
////        .getRowDtos();
////    for (int i = 0; i < rowDtos.size(); i++) {
////      rowDtos.get(i).setId((long) i+1);
////    }
////
////    mockMvc.perform(put("/v1/projects/tables/1/rows/")
////        .contentType(TestUtil.APPLICATION_JSON_UTF8)
////        .content(TestUtil.convertObjectToJsonBytes(rowDtos)))
////        .andDo(print())
////        .andExpect(status()
////            .isOk());
////  }
////
////  @Test
////  public void updateRow() throws Exception {
////    mockMvc.perform(put("/v1/projects/tables/1/row")
////        .contentType(TestUtil.APPLICATION_JSON_UTF8)
////        .content(TestUtil.convertObjectToJsonBytes(getTestTableDto().getRowDtos().get(0))))
////        .andDo(print())
////        .andExpect(status()
////            .isOk());
////  }
////
////  @Test
////  public void getRowById() throws Exception {
////    mockMvc.perform(
////        get("/v1/projects/tables/rows/1"))
////        .andDo(print())
////        .andExpect(status().isOk());
////  }
////
//  @Test
//  public void getRowsByTableId() throws Exception {
//    mockMvc.perform(
//        get("/v1/projects/tables/1/rows"))
//        .andDo(print())
//        .andExpect(status().isOk());
//  }
////
////  @Test
////  public void updateTable() throws Exception {
////    List<RowDto> rowDtos = new ArrayList<>();
////    rowDtos.add(getRowDto());
////    ProjectTableDto projectTableDto = new ProjectTableDto(3L,"new Name",rowDtos);
////
////    mockMvc.perform(put("/v1/projects/3/tables")
////        .contentType(TestUtil.APPLICATION_JSON_UTF8)
////        .content(TestUtil.convertObjectToJsonBytes(projectTableDto)))
////        .andDo(print())
////        .andExpect(status()
////            .isOk());
////  }
////
////  @Test
////  public void addTableByProjectId() throws Exception {
////
////    mockMvc.perform(post("/v1/projects/1/tables")
////        .contentType(TestUtil.APPLICATION_JSON_UTF8)
////        .content(TestUtil.convertObjectToJsonBytes(getTestTableDto())))
////        .andDo(print())
////        .andExpect(status().isOk());
////  }
////
//  @Test
//  public void getTableValuesById() throws Exception {
//    mockMvc.perform(
//        get("/v1/projects/tables/1"))
//        .andDo(print())
//        .andExpect(status().isOk());
//  }
////
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
//  private ProjectDto getTestProject() {
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
//
//  private ProjectTableDto getTestTableDto() {
//    RowDto rowDto = new RowDto(null,"Added Row111",new ArrayList<>());
//    rowDto.addColumnValue(new IntValueDto(111));
//    rowDto.addColumnValue(new IntValueDto(111));
//    rowDto.addColumnValue(new DateValueDto(new Date()));
//    rowDto.addColumnValue(new DescriptionValueDto("Added value111"));
//    rowDto.addColumnValue(new EnumValueDto("added Status111"));
//    List<RowDto> rowDtos = new ArrayList<>();
//
//    RowDto rowDto2 = new RowDto(null,"Added Row333",new ArrayList<>());
//    rowDto.addColumnValue(new IntValueDto(333));
//    rowDto.addColumnValue(new IntValueDto(333));
//    rowDto.addColumnValue(new DateValueDto(new Date()));
//    rowDto.addColumnValue(new DescriptionValueDto("Added value333"));
//    rowDto.addColumnValue(new EnumValueDto("added Status333"));
//
//    rowDtos.add(rowDto);
//    rowDtos.add(rowDto2);
//    return new ProjectTableDto(1L,"TABLE1", rowDtos);
//  }
////
////
//  private static class TestUtil {
//    public static final MediaType APPLICATION_JSON_UTF8 =
//        new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
//
//    public static byte[] convertObjectToJsonBytes(final Object object) throws IOException {
//      final ObjectMapper mapper = new ObjectMapper();
//      mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
//      return mapper.writeValueAsBytes(object);
//    }
//  }
//}
