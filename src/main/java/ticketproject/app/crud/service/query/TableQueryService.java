package ticketproject.app.crud.service.query;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
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
import java.sql.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());

        return UNIQUE_USERS_IN_SINGLE_TASK_INDEX_STATEMENT
                .replaceAll(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, taskUserJunctionName);
    }

    private String prepareDefineTableTasksUsersJunctionStatement(TableDefinitionDto tableDefinitionDto) {
        String taskTableName = TABLE_TASK_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());
        String taskUSerJunctionName = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());

        return DEFINE_TASKS_USERS_JUNCTION_STATEMENT
                .replaceAll(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, taskUSerJunctionName)
                .replaceFirst(TABLE_TASK_NAME_VARIABLE, taskTableName);
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
        Map<Long, List<TaskDto>> rowIdtoTask = new HashMap<>();

        getJDBCTemplate()
                .query(prepareGetRowsStatement(tableName), (resultSet, rowNum) -> {
                    rows.addAll(getRows(columnsMetadata, resultSet));
                    return null;
                });

        getJDBCTemplate()
                .query(prepareGetTasksStatement(tableName), (resultSet, rowNum) -> {
                    rowIdtoTask.putAll(getTasks(resultSet, tableName));
                    return null;
                });


        return rows.stream()
                .map(rowDto -> rowIdtoTask.get(rowDto.getId()) != null ? RowDto.addTasks(rowDto, rowIdtoTask.get(rowDto.getId())) : rowDto)
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

    public TaskDto addTaskToRow(String tableName, Long rowId, TaskDto taskDto) {

        String statement = ADD_TASK_TO_ROW_STATEMENT
                .replaceFirst(TABLE_TASK_NAME_VARIABLE, tableName);

        List<Object> values = new ArrayList<>();
        values.add(taskDto.getDescription());
        values.add(taskDto.getName());
        values.add(taskDto.getStatus().name());
        taskDto.setId(runParametrizedUpdate(statement, values).getKey().longValue());

        statement = ADD_TASK_TO_ROW_REFERENCE_STATEMENT
                .replaceFirst(TABLE_TASK_JUNCTION_NAME_VARIABLE, tableName);
        values = new ArrayList<>();
        values.add(rowId.toString());
        values.add(taskDto.getId().toString());
        runParametrizedUpdate(statement, values);

        return taskDto;
    }

    @Transactional
    public boolean deleteTask(Long taskId, String tableName) {
        String statement = DELETE_TASK_FROM_JUNCTION_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        runParametrizedUpdate(statement, Collections.singletonList(taskId));

        statement = DELETE_TASK_STATEMENT
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        runParametrizedUpdate(statement, Collections.singletonList(taskId));
        return true;
    }

    @Transactional
    public TaskDto assignUserToTask(String tableName, Long taskId, String username) {
        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        String statement = ASSIGN_USER_TO_TASK
                .replaceFirst(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, tableTaskUserJunction);


        User user = userRepository.findByUsername(username);

        runParametrizedUpdate(statement, ImmutableList.of(taskId, user.getId()));

        return getTask(tableName, taskId);
    }

    private TaskDto getTask(String tableName, Long taskId) {
        String tableTaskName = TABLE_TASK_NAME_VARIABLE.replaceFirst(TABLE_NAME_VARIABLE, tableName);

        String statement = GET_TASK_STATEMENT.
                replaceFirst(TABLE_TASK_NAME_VARIABLE, tableTaskName)
                .replace("?", taskId.toString());


        List<TaskDto> tasks = new ArrayList<>();

        getJDBCTemplate()
                .query(statement, (resultSet) -> {
                    tasks.add(getTask(resultSet, tableName));
                });

        return tasks.get(0);
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
        rowDto = rowDto.updateWithCreationAnfModificationInfo(rowDto)
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

    private static String prepareDefineTableStatement(TableDefinitionDto tableDefinitionDto) {
        String statement = DEFINE_TABLE_STATEMENT.replaceFirst(TABLE_NAME_VARIABLE, tableDefinitionDto.getName());
        return statement.replaceFirst(COLUMN_DEFINITIONS_VARIABLE, getSeparatedColumnDefinitions(tableDefinitionDto));
    }

    private static String getSeparatedColumnDefinitions(TableDefinitionDto tableDefinitionDto) {
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

    private static JdbcTemplate getJDBCTemplate() {
        return new JdbcTemplate(
                new SingleConnectionDataSource(DbManager.INSTANCE.getConnection(), true));
    }

    public TaskDto removeUserFromTask(String tableName, Long taskId, String username) {
        TaskDto task = getTask(tableName, taskId);
        String tableTaskUserJunction = TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
                .replaceFirst(TABLE_NAME_VARIABLE, tableName);

        String statement = DELETE_TASKS_USER_BY_ID_STATEMENT
                .replaceFirst(TABLE_TASK_USER_JUNCTION_NAME_VARIABLE, tableTaskUserJunction);

        User user = userRepository.findByUsername(username);

        getJDBCTemplate()
                .update(statement, taskId, user.getId());

        task.getUserNames().remove(username);

        return task;
    }
}

