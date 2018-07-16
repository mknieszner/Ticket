package ticketproject.app.crud.service.query;

import com.google.common.collect.ImmutableList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import ticketproject.app.DbManager;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.authorization.UserDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.domain.dto.values.column.ColumnValueDto;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.domain.entities.Task;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.service.helper.ColumnType;

import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;
import static ticketproject.app.crud.service.UserService.getCurrentUserUsername;
import static ticketproject.app.crud.service.query.TableQueryBaseStatements.*;


@Slf4j
@Component
@RequiredArgsConstructor
public class TableQueryService {

    private final ProjectTableRepository projectTableRepository;
    private final UserRepository userRepository;
    private final DbManager dbManager;
    private final TableQueryBaseStatements statements;

    //TODO POLSKIE ZNAKI!
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

        String tableTasksUsersJunctionStatement = prepareDefineTableTasksUsersJunctionStatement(tableDefinitionDto);
        getJDBCTemplate()
                .update(tableTasksUsersJunctionStatement);

        String uniqueTaskUsersIndexStatement = prepareUniqueUserPerSingleTask(tableDefinitionDto);
        getJDBCTemplate()
                .update(uniqueTaskUsersIndexStatement);

    }

    private String prepareUniqueUserPerSingleTask(TableDefinitionDto tableDefinitionDto) {
        String taskUserJunctionName = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());

        return UNIQUE_USERS_IN_SINGLE_TASK_INDEX_STATEMENT
                .replaceAll(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, taskUserJunctionName);
    }

    private String prepareDefineTableTasksUsersJunctionStatement(TableDefinitionDto tableDefinitionDto) {
        String taskTableName = TABLE_TASK_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());
        String taskUSerJunctionName = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());

        return statements.getDefineTasksUsersJunctionStatement()
                .replaceAll(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, taskUSerJunctionName)
                .replaceFirst(TABLE_TASK_NAME_VARIABLE, taskTableName);
    }

    private String prepareDefineTableTasksJunctionStatement(TableDefinitionDto tableDefinitionDto) {
        String taskTableJunctionName = TABLE_TASK_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());

        String taskTableName = TABLE_TASK_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());

        return statements.getDefineTableTasksJunctionStatement()
                .replaceFirst(TABLE_TASK_JUNCTION_NAME_VARIABLE, taskTableJunctionName)
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName())
                .replaceFirst(TABLE_TASK_NAME_VARIABLE, taskTableName);
    }

    private String prepareDefineTableTasksStatement(TableDefinitionDto tableDefinitionDto) {
        return statements.getDefineTableTasksStatement()
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());
    }

    public List<RowDto> getRows(String tableName, List<ColumnDetail> columnDetails) {
        List<ColumnDetail> toCorrectSqlColumnDetails = columnDetails.stream()
                .peek(detail -> detail.setName(toCorrectSqlColumnName(detail.getName())))
                .collect(toList());

        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        List<RowDto> rows = new ArrayList<>();
        Map<Long, List<TaskDto>> rowIdtoTask = new HashMap<>();

        getJDBCTemplate()
                .query(prepareGetRowsStatement(sqlCorrectTableName), (resultSet, rowNum) -> {
                    rows.addAll(getRows(toCorrectSqlColumnDetails, resultSet));
                    return null;
                });

        getJDBCTemplate()
                .query(prepareGetTasksStatement(sqlCorrectTableName), (resultSet, rowNum) -> {
                    rowIdtoTask.putAll(getTasks(resultSet, sqlCorrectTableName));
                    return null;
                });


        return rows.stream()
                .map(rowDto -> rowIdtoTask.get(rowDto.getId()) != null ? RowDto.addTasks(rowDto, rowIdtoTask.get(rowDto.getId())) : rowDto)
                .collect(toList());
    }

    public List<TaskDto> getUserTasks(String tableName, String username) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        Map<Long, List<TaskDto>> rowIdToTask = new HashMap<>();

        getJDBCTemplate()
                .query(prepareGetTasksStatement(sqlCorrectTableName), (resultSet, rowNum) -> {
                    rowIdToTask.putAll(getTasks(resultSet, sqlCorrectTableName));
                    return null;
                });

        return rowIdToTask.values().stream()
                .flatMap(Collection::stream)
                .filter(taskDto -> taskDto.getUserNames().contains(username))
                .collect(toList());
    }

    private Map<Long, List<TaskDto>> getTasks(ResultSet resultSet, String tableName) throws SQLException {
        Map<Long, List<TaskDto>> rowIdtoTask = new HashMap<>();

        while (!resultSet.isAfterLast()) {
            Pair<Long, List<TaskDto>> taskAsPair = getTaskAsPair(resultSet, tableName);
            rowIdtoTask.merge(taskAsPair.getFirst(), taskAsPair.getSecond(), (oldObj, newObj) -> {
                oldObj.addAll(newObj);
                return oldObj;
            });
            resultSet.next();
        }
        return rowIdtoTask;
    }

    private Pair<Long, List<TaskDto>> getTaskAsPair(ResultSet resultSet, String tableName) throws SQLException {
        Long rowId = resultSet.getLong("ROW_ID");
        return Pair.of(rowId, new ArrayList<>(Collections.singletonList(getTask(resultSet, tableName))));
    }

    private TaskDto getTask(ResultSet resultSet, String tableName) throws SQLException {
        //TODO INNER TASKS!
        Set<String> unsignedUsers = getTaskUsers(resultSet.getLong("ID"), tableName).stream()
                .map(UserDto::getUsername)
                .collect(Collectors.toSet());

        return new TaskDto(
                resultSet.getLong("ID"),
                resultSet.getLong("TABLE_ID"),
                resultSet.getString("NAME"),
                resultSet.getString("DESCRIPTION"),
                Task.Status.valueOf(resultSet.getString("STATUS")),
                unsignedUsers,
                Collections.emptyList()
        );
    }

    private Set<UserDto> getTaskUsers(Long taskId, String tableName) {
        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        String statement = GET_TASK_USERS_STATEMENT
                .replace(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, tableTaskUserJunction)
                .replace("?", taskId.toString());

        Set<UserDto> users = new HashSet<>();

        getJDBCTemplate()
                .query(statement, (resultSet) -> {
                    users.addAll(ofNullable(getUsers(resultSet)).orElseGet(HashSet::new));
                });

        return users;
    }

    private Set<UserDto> getUsers(ResultSet resultSet) throws SQLException {
        Set<UserDto> users = new HashSet<>();
        while (!resultSet.isAfterLast()) {
            users.add(getUser(resultSet));
            resultSet.next();
        }
        return users;
    }

    private UserDto getUser(ResultSet resultSet) throws SQLException {
        return new UserDto(
                resultSet.getString("username"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("email"),
                resultSet.getString("password"),
                resultSet.getBoolean("enabled"),
                new ArrayList<>()
        );
    }

    public RowDto addRow(RowDto rowDto, String tableName) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        rowDto = setNotModifiableNewRowValues(rowDto);

        String parameterPlaceholders = getQuestionMarkParametersPlaceholders(rowDto);
        List<Object> rowValues = getRowValues(rowDto);
        String columnNames = getSeparatedColumnNamesNoSql(tableName, "", ", ", "");

        String statement = ADD_ROW_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName)
                .replaceFirst(ORDERED_COLUMN_NAMES_VARIABLE, columnNames)
                .replaceFirst(ORDERED_ROW_VALUES_VARIABLE, parameterPlaceholders);

        KeyHolder keys = runParametrizedUpdate(statement, rowValues);

        //mysql - posgres workaround
        rowDto.setId(((Integer) keys.getKeys().getOrDefault("GENERATED_KEY", keys.getKeys().get("ID"))).longValue());

        return rowDto;
    }

    public RowDto updateRow(RowDto rowDto, String tableName) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        rowDto = setNotModifiableEditRowValues(rowDto);
        List<Object> rowValues = getRowValues(rowDto);
        String columnNamesAndQuestionMarkParametersPlaceholders = getSeparatedColumnNamesNoSql(tableName, "", "=?, ", "=? ");

        String statement = UPDATE_ROW_STATEMENT
                .replace("?", rowDto.getId().toString())
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName)
                .replaceFirst(COLUMN_VALUE_PAIRS, columnNamesAndQuestionMarkParametersPlaceholders);

        runParametrizedUpdate(statement, rowValues);

        return rowDto;
    }

    public boolean deleteRowById(String tableName, Long rowId) {
        String statement = DELETE_BY_ID_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, toCorrectSqlTableName(tableName));

        int count = getJDBCTemplate()
                .update(statement, rowId);
        return count > 0;
    }

    public TaskDto addTaskToRow(String tableName, Long rowId, TaskDto taskDto) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        String statement = ADD_TASK_TO_ROW_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        List<Object> values = new ArrayList<>();
        values.add(taskDto.getTableId());
        values.add(taskDto.getDescription());
        values.add(taskDto.getName());
        values.add(taskDto.getStatus().name());

        //postgres
        taskDto.setId(((Integer) runParametrizedUpdate(statement, values).getKeys().get("ID")).longValue());

        statement = ADD_TASK_TO_ROW_REFERENCE_STATEMENT
                .replaceFirst(TABLE_TASK_JUNCTION_NAME_VARIABLE, sqlCorrectTableName);
        values = new ArrayList<>();
        values.add(rowId);
        values.add(taskDto.getId().toString());
        runParametrizedUpdate(statement, values);

        return taskDto;
    }

    @Transactional
    public boolean deleteTask(Long taskId, String tableName) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        String statement = DELETE_TASK_FROM_JUNCTION_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        runParametrizedUpdate(statement, Collections.singletonList(taskId));

        statement = DELETE_TASK_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        runParametrizedUpdate(statement, Collections.singletonList(taskId));
        return true;
    }

    @Transactional
    public TaskDto assignUserToTask(String tableName, Long taskId, String username) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        String statement = ASSIGN_USER_TO_TASK
                .replaceFirst(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, tableTaskUserJunction);

        User user = userRepository.findByUsername(username);

        runParametrizedUpdate(statement, ImmutableList.of(taskId, user.getId()));

        return getTask(tableName, taskId);
    }

    private TaskDto getTask(String tableName, Long taskId) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        String tableTaskName = TABLE_TASK_NAME_VARIABLE.replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        String statement = GET_TASK_STATEMENT.
                replaceFirst(TABLE_TASK_NAME_VARIABLE, tableTaskName)
                .replace("?", taskId.toString());


        List<TaskDto> tasks = new ArrayList<>();

        getJDBCTemplate()
                .query(statement, (resultSet) -> {
                    tasks.add(getTask(resultSet, sqlCorrectTableName));
                });

        return tasks.get(0);
    }

    public TaskDto updateTask(String tableName, TaskDto taskDto) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        String statement = SIMPLE_UPDATE_TASK_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        List<Object> values = new ArrayList<>();
        values.add(taskDto.getDescription());
        values.add(taskDto.getName());
        values.add(taskDto.getStatus().name());
        values.add(taskDto.getId());

        runParametrizedUpdate(statement, values);

        return taskDto;
    }

    public TaskDto removeUserFromTask(String tableName, Long taskId, String username) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);
        TaskDto task = getTask(tableName, taskId);
        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);

        String statement = DELETE_TASKS_USER_BY_ID_STATEMENT
                .replaceFirst(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, tableTaskUserJunction);

        User user = userRepository.findByUsername(username);

        getJDBCTemplate()
                .update(statement, taskId, user.getId());

        task.getUserNames().remove(username);

        return task;
    }

    public boolean deleteTable(String tableName) {
        String sqlCorrectTableName = toCorrectSqlTableName(tableName);

        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);
        String taskTableJunctionName = TABLE_TASK_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);
        String taskTableName = TABLE_TASK_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, sqlCorrectTableName);


        List<String> statement = Stream.of(
                taskTableJunctionName,
                sqlCorrectTableName,
                tableTaskUserJunction,
                taskTableName
        )
                .map(name -> DROP_TABLES_STATEMENT.replace(TABLE_NAME_VARIABLE, name))
                .collect(Collectors.toList());

        statement.forEach(stat -> {
                    try {
                        getJDBCTemplate()
                                .execute(stat);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }

        );

        return true;
    }

    // == private methods ==

    private KeyHolder runParametrizedUpdate(String statement, List<Object> values) {
        KeyHolder holder = new GeneratedKeyHolder();
        getJDBCTemplate()
                .update(connection -> {
                    PreparedStatement ps = connection.prepareStatement(statement, java.sql.Statement.RETURN_GENERATED_KEYS);
                    int i = 1;
                    for (Object value : values) {
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
        rowDto = RowDto.updateWithCreationAnfModificationInfo(rowDto)
                .createdBy(getCurrentUserUsername())
                .createdOn(LocalDateTime.now())
                .lastModifiedBy(getCurrentUserUsername())
                .lastModifiedOn(LocalDateTime.now())
                .build();
        return rowDto;
    }

    private static RowDto setNotModifiableEditRowValues(RowDto rowDto) {
        rowDto = rowDto.updateWithfModificationInfo(rowDto)
                .lastModifiedBy(getCurrentUserUsername())
                .lastModifiedOn(LocalDateTime.now())
                .build();
        return rowDto;
    }

    private static String prepareGetRowsStatement(String tableName) {
        return GET_TABLE_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);
    }

    private static String prepareGetTasksStatement(String tableName) {
        return GET_TABLE_TASKS_STATEMENT
                .replace(TABLE_NAME_VARIABLE, tableName);
    }

    private String prepareDefineTableStatement(TableDefinitionDto tableDefinitionDto) {
        String statement = statements.getDefineTableStatement().replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getSqlValidTableName());
        return statement.replaceFirst(COLUMN_DEFINITIONS_VARIABLE, getSeparatedColumnDefinitions(tableDefinitionDto));
    }

    private static String getSeparatedColumnDefinitions(TableDefinitionDto tableDefinitionDto) {
        StringJoiner columnsVariables = new StringJoiner(", ");
        for (int i = 0; i < tableDefinitionDto.getColumnDetailDefinitionDtoList().size(); i++) {
            columnsVariables.add(
                    String.format(tableDefinitionDto.getColumnDetailDefinitionDtoList().get(i).getType()
                            .getSqlCreationVariable(), toCorrectSqlColumnName(tableDefinitionDto.getColumnDetailDefinitionDtoList().get(i).getName()))
            );
        }
        return columnsVariables.toString();
    }

    private String getSeparatedColumnNamesNoSql(String tableName, String prefix, String delimiter, String suffix) {
        StringJoiner columnNames = new StringJoiner(delimiter, prefix, suffix);
        columnNames.add(CREATED_ON_COLUMN_NAME);
        columnNames.add(CREATED_BY_COLUMN_NAME);
        columnNames.add(LAST_MODIFIED_ON_COLUMN_NAME);
        columnNames.add(LAST_MODIFIED_BY_COLUMN_NAME);
        projectTableRepository.findByName(tableName).getColumnDetails()
                .forEach(columnDetail -> columnNames.add(toCorrectSqlColumnName(columnDetail.getName())));
        return columnNames.toString();
    }

    private static List<Object> getRowValues(RowDto rowDto) {
        List<Object> values = new ArrayList<>();
        values.add(rowDto.getCreatedOn());
        values.add(rowDto.getCreatedBy());
        values.add(rowDto.getLastModifiedOn());
        values.add(rowDto.getLastModifiedBy());
        rowDto.getColumnValueDtos().forEach(columnValueDto -> values.add(columnValueDto.getValue()));
        return values;
    }

    private static List<RowDto> getRows(List<ColumnDetail> columnsDetails, ResultSet resultSet) throws
            SQLException {
        final List<RowDto> rows = new ArrayList<>();
        while (!resultSet.isAfterLast()) {
            rows.add(getRow(columnsDetails, resultSet));
            resultSet.next();
        }
        return rows;
    }

    private static RowDto getRow(List<ColumnDetail> columnsDetails, ResultSet resultSet) throws SQLException {
        List<ColumnValueDto> columnValues = new ArrayList<>();
        columnsDetails.forEach(detail -> columnValues.add(ColumnType.Types.getGetValueFunction(detail).apply(resultSet, detail)));
        return RowDto.builder()
                .id(resultSet.getLong(ID))
                .createdBy(resultSet.getString(CREATED_BY_COLUMN_NAME))
                .createdOn(resultSet.getObject(CREATED_ON_COLUMN_NAME, LocalDateTime.class))
                .lastModifiedBy(resultSet.getString(LAST_MODIFIED_BY_COLUMN_NAME))
                .lastModifiedOn(resultSet.getObject(LAST_MODIFIED_ON_COLUMN_NAME, LocalDateTime.class))
                .columnValueDtos(columnValues)
                .build();
    }

    // TODO UUID.randomUUID() or RandomStringUtils.randomAlphanumeric(8)
    public String toCorrectSqlTableName(String tableName) {
        return tableName.replaceAll(" ", "_");
    }

    // TODO UUID.randomUUID() OR RandomStringUtils.randomAlphanumeric(8)
    public static String toCorrectSqlColumnName(String columnName) {
        return columnName.replaceAll(" ", "_");
    }


    private JdbcTemplate getJDBCTemplate() {
        return new JdbcTemplate(
                new SingleConnectionDataSource(dbManager.getConnection(), true));
    }
}

