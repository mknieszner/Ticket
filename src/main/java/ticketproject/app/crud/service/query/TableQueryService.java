package ticketproject.app.crud.service.query;

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
import java.time.LocalDateTime;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;

import static ticketproject.app.crud.service.UserService.getCurrentUserUsername;


@Slf4j
@Component
@RequiredArgsConstructor
public class TableQueryService {

    public static final String ID = "id";

    private static final String TABLE_NAME_VARIABLE = "table_name";
    private static final String TABLE_TASK_NAME_VARIABLE = "table_name_tasks";
    private static final String TABLE_TASK_JUNCTION_NAME_VARIABLE = "table_name_reference_tasks";
    private static final String COLUMN_DEFINITIONS_VARIABLE = "column_definition_list";
    private static final String ORDERED_COLUMN_NAMES_VARIABLE = "ordered_column_names";
    private static final String ORDERED_ROW_VALUES_VARIABLE = "ordered_row_values";
    private static final String COLUMN_VALUE_PAIRS = "column_value_pairs";
    private static final String CREATED_ON_COLUMN_NAME = "createdOn";
    private static final String CREATED_BY_COLUMN_NAME = "createdBy";
    private static final String LAST_MODIFIED_ON_COLUMN_NAME = "lastModifiedOn";
    private static final String LAST_MODIFIED_BY_COLUMN_NAME = "lastModifiedBy";

    private static final String DEFINE_TABLE_STATEMENT =
            String.format(
                    "CREATE TABLE %s ( " +
                            "id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT, " +
                            "createdOn datetime , " +
                            "createdBy varchar(255) , " +
                            "lastModifiedOn datetime , " +
                            "lastModifiedBy varchar(255) , " +
                            "%s)",
                    TABLE_NAME_VARIABLE,
                    COLUMN_DEFINITIONS_VARIABLE
            );

    private static final String DEFINE_TABLE_TASKS_STATEMENT =
            String.format(
                    "CREATE TABLE %s ( " +
                            "id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT, " +
                            "description varchar(255) , " +
                            "name varchar(255) , " +
                            "status varchar(255) )",
                    TABLE_TASK_NAME_VARIABLE
            );

    private static final String DEFINE_TABLE_TASKS_JUNCTION_STATEMENT =
            String.format(
                    "CREATE TABLE %s ( " +
                            "id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT, " +
                            "row_id BIGINT, " +
                            "task_id BIGINT , " +
                            "    FOREIGN KEY (row_id)\n" +
                            "        REFERENCES %s(id)\n" +
                            "        ON DELETE CASCADE," +
                            "    FOREIGN KEY (task_id)\n" +
                            "        REFERENCES %s(id)\n" +
                            "        ON DELETE CASCADE )",
                    TABLE_TASK_JUNCTION_NAME_VARIABLE,
                    TABLE_NAME_VARIABLE,
                    TABLE_TASK_NAME_VARIABLE
            );

    private static final String GET_TABLE_STATEMENT =
            String.format(
                    "SELECT * FROM %s",
                    TABLE_NAME_VARIABLE
            );

    private static final String ADD_ROW_STATEMENT =
            String.format("INSERT INTO %s " +
                            "(%s) " +
                            "VALUES " +
                            "(%s)",
                    TABLE_NAME_VARIABLE,
                    ORDERED_COLUMN_NAMES_VARIABLE,
                    ORDERED_ROW_VALUES_VARIABLE
            );

    private static final String DELETE_BY_ID_STATEMENT =
            String.format("DELETE FROM %s WHERE ID = ?",
                    TABLE_NAME_VARIABLE
            );

    private static final String UPDATE_ROW_STATEMENT =
            String.format("UPDATE %s SET %s WHERE ID = ?",
                    TABLE_NAME_VARIABLE,
                    COLUMN_VALUE_PAIRS
            );


    private final ProjectTableRepository projectTableRepository;

    @Transactional
    public void defineTable(TableDefinitionDto tableDefinitionDto) {
        String tableStatement = prepareDefineTableStatement(tableDefinitionDto);
        getJDBCTemplate()
                .update(tableStatement);

        String tasksStatement = prepareDefineTableTasksStatement(tableDefinitionDto);
        getJDBCTemplate()
                .update(tasksStatement);

        String tableTasksJunctionStatement = prepareDefineTableTasksJunctionStatement(tableDefinitionDto);
        getJDBCTemplate()
                .update(tableTasksJunctionStatement);

    }

    private String prepareDefineTableTasksJunctionStatement(TableDefinitionDto tableDefinitionDto) {
        String taskTableJunctionName = TABLE_TASK_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());

        String taskTableName = TABLE_TASK_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());

        return DEFINE_TABLE_TASKS_JUNCTION_STATEMENT
                .replaceFirst(TABLE_TASK_JUNCTION_NAME_VARIABLE, taskTableJunctionName)
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName())
                .replaceFirst(TABLE_TASK_NAME_VARIABLE, taskTableName);
    }

    private String prepareDefineTableTasksStatement(TableDefinitionDto tableDefinitionDto) {
        return DEFINE_TABLE_TASKS_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());
    }

    public List<RowDto> getRows(String tableName, List<ColumnDetail> columnsMetadata) {
        List<RowDto> rows = new ArrayList<>();

        getJDBCTemplate()
                .query(prepareGetRowsStatement(tableName), (resultSet, rowNum) ->
                        rows.addAll(getRows(columnsMetadata, resultSet)));
        return rows;
    }

    public RowDto addRow(RowDto rowDto, String tableName) {
        rowDto = setNotModifiableNewRowValues(rowDto);

        String parameterPlaceholders = getQuestionMarkParametersPlaceholders(rowDto);
        List<Object> rowValues = getRowValues(rowDto);
        String columnNames = getSeparatedColumnNames(tableName, "", ", ", "");

        String statement = ADD_ROW_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName)
                .replaceFirst(ORDERED_COLUMN_NAMES_VARIABLE, columnNames)
                .replaceFirst(ORDERED_ROW_VALUES_VARIABLE, parameterPlaceholders);

        rowDto.setId(runParametrizedUpdate(statement, rowValues).getKey().longValue());

        return rowDto;
    }

    public RowDto updateRow(RowDto rowDto, String tableName) {
        rowDto = setNotModifiableEditRowValues(rowDto);
        List<Object> rowValues = getRowValues(rowDto);
        String columnNamesAndQuestionMarkParametersPlaceholders = getSeparatedColumnNames(tableName, "", "=?, ", "=? ");

        String statement = UPDATE_ROW_STATEMENT
                .replace("?", rowDto.getId().toString())
                .replaceFirst(TABLE_NAME_VARIABLE, tableName)
                .replaceFirst(COLUMN_VALUE_PAIRS, columnNamesAndQuestionMarkParametersPlaceholders);

        runParametrizedUpdate(statement, rowValues);

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

    private KeyHolder runParametrizedUpdate(String statement, List<Object> rowValues) {
        KeyHolder holder = new GeneratedKeyHolder();
        getJDBCTemplate()
                .update(connection -> {
                    PreparedStatement ps = connection.prepareStatement(statement, java.sql.Statement.RETURN_GENERATED_KEYS);
                    int i = 1;
                    for (Object value : rowValues) {
                        ps.setObject(i, value);
                        i++;
                    }
                    return ps;
                }, holder);
        return holder;
    }

    private String getQuestionMarkParametersPlaceholders(RowDto rowDto) {
        StringJoiner parameterPlaceholders = new StringJoiner(",");
        rowDto.getColumnValueDtos().forEach(columnValueDto -> parameterPlaceholders.add("?"));
        parameterPlaceholders.add("?,?,?,?");
        return parameterPlaceholders.toString();
    }

    private RowDto setNotModifiableNewRowValues(RowDto rowDto) {
        rowDto = rowDto.updateWithCreationAnfModificationInfo(rowDto)
                .createdBy(getCurrentUserUsername())
                .createdOn(LocalDateTime.now())
                .lastModifiedBy(getCurrentUserUsername())
                .lastModifiedOn(LocalDateTime.now())
                .build();
        return rowDto;
    }

    private RowDto setNotModifiableEditRowValues(RowDto rowDto) {
        rowDto = rowDto.updateWithfModificationInfo(rowDto)
                .lastModifiedBy(getCurrentUserUsername())
                .lastModifiedOn(LocalDateTime.now())
                .build();
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
        StringJoiner columnsVariables = new StringJoiner(", ");
        for (int i = 0; i < tableDefinitionDto.getColumnDetailDefinitionDtoList().size(); i++) {
            columnsVariables.add(
                    String.format(tableDefinitionDto.getColumnDetailDefinitionDtoList().get(i).getType()
                            .getSqlCreationVariable(), tableDefinitionDto.getColumnDetailDefinitionDtoList().get(i).getName())
            );
        }
        return columnsVariables.toString();
    }

    private String getSeparatedColumnNames(String tableName, String prefix, String delimiter, String suffix) {
        StringJoiner columnNames = new StringJoiner(delimiter, prefix, suffix);
        columnNames.add(CREATED_ON_COLUMN_NAME);
        columnNames.add(CREATED_BY_COLUMN_NAME);
        columnNames.add(LAST_MODIFIED_ON_COLUMN_NAME);
        columnNames.add(LAST_MODIFIED_BY_COLUMN_NAME);
        projectTableRepository.findByName(tableName).getColumnDetails()
                .forEach(columnDetail -> columnNames.add(columnDetail.getName()));
        return columnNames.toString();
    }

    private List<Object> getRowValues(RowDto rowDto) {
        List<Object> values = new ArrayList<>();
        values.add(rowDto.getCreatedOn());
        values.add(rowDto.getCreatedBy());
        values.add(rowDto.getLastModifiedOn());
        values.add(rowDto.getLastModifiedBy());
        rowDto.getColumnValueDtos().forEach(columnValueDto -> values.add(columnValueDto.getValue()));
        return values;
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
        columnsDetails.forEach(detail -> row.addColumnValue(ColumnType.Types.getGetValueFunction(detail).apply(resultSet, detail)));
        return row.updateWithCreationAnfModificationInfo(row)
                .id(resultSet.getLong(ID))
                .createdBy(resultSet.getString(CREATED_BY_COLUMN_NAME))
                .createdOn(resultSet.getObject(CREATED_ON_COLUMN_NAME, LocalDateTime.class))
                .lastModifiedBy(resultSet.getString(LAST_MODIFIED_BY_COLUMN_NAME))
                .lastModifiedOn(resultSet.getObject(LAST_MODIFIED_ON_COLUMN_NAME, LocalDateTime.class))
                .build();
    }

    private JdbcTemplate getJDBCTemplate() {
        return new JdbcTemplate(
                new SingleConnectionDataSource(DbManager.INSTANCE.getConnection(), true));
    }
}

