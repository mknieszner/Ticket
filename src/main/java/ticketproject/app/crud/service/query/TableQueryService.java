package ticketproject.app.crud.service.query;

import com.mysql.jdbc.Statement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import ticketproject.app.DbManager;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.column.ColumnValueDto;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.transaction.Transactional;
import java.sql.*;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;

import static ticketproject.app.crud.service.UserService.getCurrentUserUsername;


@Slf4j
@Component
@RequiredArgsConstructor
public class TableQueryService {

    public static final String TABLE_NAME_VARIABLE = "table_name";
    public static final String COLUMN_DEFINITIONS_VARIABLE = "column_definition_list";
    public static final String ORDERED_COLUMN_NAMES_VARIABLE = "ordered_column_names";
    public static final String ORDERED_ROW_VALUES_VARIABLE = "ordered_row_values";
    public static final String ID = "id";
    private static final String DEFINE_TABLE_STATEMENT =
            String.format(
                    "CREATE TABLE %s ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, %s)",
                    TABLE_NAME_VARIABLE,
                    COLUMN_DEFINITIONS_VARIABLE
            );
    private static final String GET_TABLE_STATEMENT =
            String.format(
                    "SELECT * FROM %s",
                    TABLE_NAME_VARIABLE
            );
    private static final String ADD_ROW_STATEMENT =
            String.format("INSERT INTO %s (%s) VALUES (%s)",
                    TABLE_NAME_VARIABLE,
                    ORDERED_COLUMN_NAMES_VARIABLE,
                    ORDERED_ROW_VALUES_VARIABLE
            );
    private static final String DELETE_BY_ID_STATEMENT =
            String.format("DELETE FROM %s WHERE ID = ?",
                    TABLE_NAME_VARIABLE
            );


    private final ProjectTableRepository projectTableRepository;

    @Transactional
    public void defineTable(TableDefinitionDto tableDefinitionDto) {
        String statement = prepareDefineTableStatement(tableDefinitionDto);

        getJDBCTemplate()
                .update(statement);
    }

    public List<RowDto> getRows(String tableName, List<ColumnDetail> columnsMetadata) {
        List<RowDto> rows = new ArrayList<>();


        getJDBCTemplate()
                .query(prepareGetRowsStatement(tableName), (resultSet, rowNum) ->
                        rows.addAll(getRows(columnsMetadata, resultSet)));
        return rows;
    }

    public RowDto addRow(RowDto rowDto, String tableName) {
        rowDto = setNotModifiableRowValues(rowDto);
        String parameterPlaceholders = getParametersPlaceholders(rowDto);
        List<Object> rowValues = getRowValues(rowDto);
        String columnNames = getSeparatedColumnNames(tableName);
        KeyHolder holder = new GeneratedKeyHolder();

        String statement = ADD_ROW_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName)
                .replaceFirst(ORDERED_COLUMN_NAMES_VARIABLE, columnNames)
                .replaceFirst(ORDERED_ROW_VALUES_VARIABLE, parameterPlaceholders);

        getJDBCTemplate()
                .update(connection -> {
                    PreparedStatement ps = connection.prepareStatement(statement, Statement.RETURN_GENERATED_KEYS);
                    int i = 1;
                    for (Object value : rowValues) {
                        ps.setObject(i, value);
                        i++;
                    }
                    return ps;
                }, holder);

        rowDto.setId((long) holder.getKey().intValue());

        return rowDto;
    }

    public boolean deleteRowById(String tableName, Long rowId) {
        String statement = DELETE_BY_ID_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        int count = getJDBCTemplate()
                .update(statement, rowId);
        return count > 0;
    }

    // == private methods ==

    private String getParametersPlaceholders(RowDto rowDto) {
        StringJoiner parameterPlaceholders = new StringJoiner(",");
        rowDto.getColumnValueDtos().forEach(columnValueDto -> parameterPlaceholders.add("?"));
        return parameterPlaceholders.toString();
    }

    //TODO update kiedy będa pola w bazie (define table)
    private RowDto setNotModifiableRowValues(RowDto rowDto) {
        rowDto.setCreatedBy(getCurrentUserUsername());
        rowDto.setLastModifiedBy(getCurrentUserUsername());
        rowDto.setCreatedOn(new Date());
        rowDto.setLastModifiedOn(new Date());
        return rowDto;
    }

    private String prepareGetRowsStatement(String tableName) {
        return GET_TABLE_STATEMENT.replaceFirst(TABLE_NAME_VARIABLE, tableName);
    }

    private String prepareDefineTableStatement(TableDefinitionDto tableDefinitionDto) {
        String statement = DEFINE_TABLE_STATEMENT.replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());
        return statement.replaceFirst(COLUMN_DEFINITIONS_VARIABLE, getSeparatedColumnDefinitions(tableDefinitionDto));
    }

    private String getSeparatedColumnDefinitions(TableDefinitionDto tableDefinitionDto) {
        StringJoiner columnsVariables = new StringJoiner("', '");
        for (int i = 0; i < tableDefinitionDto.getColumnDetailDefinitionDtoList().size(); i++) {
            columnsVariables.add(
                    tableDefinitionDto.getColumnDetailDefinitionDtoList().get(i).getType()
                            .getSqlCreationVariable()
            );
        }
        return columnsVariables.toString();
    }

    private String getSeparatedColumnNames(String tableName) {
        StringJoiner columnNames = new StringJoiner(", ");
        projectTableRepository.findByName(tableName).getColumnDetails()
                .forEach(columnDetail -> columnNames.add(columnDetail.getName()));
        return columnNames.toString();
    }

    private List<Object> getRowValues(RowDto rowDto) {
       return rowDto.getColumnValueDtos().stream()
               .map(ColumnValueDto::getValue)
               .collect(Collectors.toList());
    }

    private List<RowDto> getRows(List<ColumnDetail> columnsDetails, ResultSet resultSet) throws SQLException {
        final List<RowDto> rows = new ArrayList<>();
        while (!resultSet.isAfterLast()) {
            rows.add(getRow(columnsDetails, resultSet));
            resultSet.next();
        }
        return rows;
    }

    private RowDto getRow(List<ColumnDetail> columnsDetails, ResultSet resultSet) throws SQLException {
        RowDto row = new RowDto();
        row.setId(resultSet.getLong("ID"));
        columnsDetails.forEach(detail -> row.addColumnValue(ColumnType.Types.getGetValueFunction(detail).apply(resultSet,detail)));
        return row;
    }

    private JdbcTemplate getJDBCTemplate() {
        return new JdbcTemplate(
                new SingleConnectionDataSource(DbManager.INSTANCE.getConnection(), true));
    }
}

