package ticketproject.app.crud.service.query;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class TableQueryBaseStatements {
    @Value("${spring.jpa.database}")
    private String database;

    private DatabaseDependentStatementParams params;

    @PostConstruct
    private void init() {
        params = DatabaseDependentStatementParams.valueOf(database);
    }

    public static final String ID = "id";

    static final String TABLE_NAME_VARIABLE = "table_name";
    static final String TABLE_TASK_NAME_VARIABLE = "table_name_tasks";
    static final String TABLE_TASK_JUNCTION_NAME_VARIABLE = "table_name_reference_tasks";
    static final String TABLE_TASK_USER_JUNCTION_NAME_VARIABLE = "table_name_tasks_reference_user";
    static final String COLUMN_DEFINITIONS_VARIABLE = "column_definition_list";
    static final String ORDERED_COLUMN_NAMES_VARIABLE = "ordered_column_names";
    static final String ORDERED_ROW_VALUES_VARIABLE = "ordered_row_values";
    static final String COLUMN_VALUE_PAIRS = "column_value_pairs";
    static final String CREATED_ON_COLUMN_NAME = "createdOn";
    static final String CREATED_BY_COLUMN_NAME = "createdBy";
    static final String LAST_MODIFIED_ON_COLUMN_NAME = "lastModifiedOn";
    static final String LAST_MODIFIED_BY_COLUMN_NAME = "lastModifiedBy";

    final String getDefineTableStatement() {
        return String.format(
                "CREATE TABLE %s ( " +
                        "id " + params.getAutoIncrement() + ", " +
                        "createdOn timestamp , " +
                        "createdBy varchar(255) , " +
                        "lastModifiedOn timestamp , " +
                        "lastModifiedBy varchar(255) , " +
                        "%s)",
                TABLE_NAME_VARIABLE,
                COLUMN_DEFINITIONS_VARIABLE
        );
    }

    final String getDefineTableTasksStatement() {
        return String.format(
                "CREATE TABLE %s ( " +
                        "id " + params.getAutoIncrement() + ", " +
                        "table_id BIGINT," +
                        "description varchar(255) , " +
                        "name varchar(255) , " +
                        "status varchar(255) )",
                TABLE_TASK_NAME_VARIABLE
        );
    }

    final String getDefineTableTasksJunctionStatement() {
        return String.format(
                "CREATE TABLE %s ( " +
                        "id " + params.getAutoIncrement() + ", " +
                        "row_id BIGINT, " +
                        "task_id BIGINT , " +
                        "    FOREIGN KEY (row_id)" +
                        "        REFERENCES %s(id)" +
                        "        ON DELETE CASCADE," +
                        "    FOREIGN KEY (task_id)" +
                        "        REFERENCES %s(id)" +
                        "        ON DELETE CASCADE )",
                TABLE_TASK_JUNCTION_NAME_VARIABLE,
                TABLE_NAME_VARIABLE,
                TABLE_TASK_NAME_VARIABLE
        );
    }

    final String getDefineTasksUsersJunctionStatement() {
        return String.format(
                "CREATE TABLE %s ( " +
                        "id " + params.getAutoIncrement() + ", " +
                        "task_id BIGINT, " +
                        "user_id BIGINT , " +
                        "    FOREIGN KEY (task_id)" +
                        "        REFERENCES %s(id)" +
                        "        ON DELETE CASCADE," +
                        "    FOREIGN KEY (user_id)" +
                        "        REFERENCES users(id)" +
                        "        ON DELETE CASCADE " +
                        ")",
                TABLE_TASK_USER_JUNCTION_NAME_VARIABLE,
                TABLE_TASK_NAME_VARIABLE
        );
    }

    static final String UNIQUE_USERS_IN_SINGLE_TASK_INDEX_STATEMENT =
            String.format(
                    "CREATE UNIQUE INDEX unique_%s ON %s(task_id, user_id)",
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE,
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
            );


    static final String GET_TABLE_STATEMENT =
            String.format(
                    "SELECT * FROM %s",
                    TABLE_NAME_VARIABLE
            );

    static final String GET_TABLE_TASKS_STATEMENT =
            ("SELECT %s.id as ROW_ID, %s_tasks.id, %s_tasks.TABLE_ID, %s_tasks.NAME, %s_tasks.DESCRIPTION, %s_tasks.STATUS " +
                    "FROM %s, %s_tasks, %s_reference_tasks " +
                    "WHERE %s_reference_tasks.row_id=%s.id AND %s_reference_tasks.task_id=%s_tasks.id")
                    .replace("%s", TABLE_NAME_VARIABLE);

    static final String ADD_ROW_STATEMENT =
            String.format("INSERT INTO %s " +
                            "(%s) " +
                            "VALUES " +
                            "(%s)",
                    TABLE_NAME_VARIABLE,
                    ORDERED_COLUMN_NAMES_VARIABLE,
                    ORDERED_ROW_VALUES_VARIABLE
            );

    static final String ADD_TASK_TO_ROW_STATEMENT =
            String.format("INSERT INTO %s_tasks (table_id, description, name, status) " +
                            "VALUES (?, ?, ?, ?)",
                    TABLE_NAME_VARIABLE
            );

    static final String SIMPLE_UPDATE_TASK_STATEMENT =
            String.format("UPDATE %s_tasks SET " +
                            "description = ?, " +
                            "name = ?, " +
                            "status = ? " +
                            "WHERE id = ?",
                    TABLE_NAME_VARIABLE
            );

    static final String DELETE_TASK_STATEMENT =
            String.format("DELETE FROM %s_tasks WHERE ID=?",
                    TABLE_NAME_VARIABLE
            );

    static final String DELETE_TASK_FROM_JUNCTION_STATEMENT =
            String.format("DELETE FROM %s_reference_tasks WHERE TASK_ID=?",
                    TABLE_NAME_VARIABLE
            );

    static final String ADD_TASK_TO_ROW_REFERENCE_STATEMENT =
            String.format("INSERT INTO %s_reference_tasks (row_id , task_id) " +
                            "VALUES (?, ?)",
                    TABLE_TASK_JUNCTION_NAME_VARIABLE
            );

    static final String DELETE_BY_ID_STATEMENT =
            String.format("DELETE FROM %s WHERE ID = ?",
                    TABLE_NAME_VARIABLE
            );

    static final String UPDATE_ROW_STATEMENT =
            String.format("UPDATE %s SET %s WHERE ID = ?",
                    TABLE_NAME_VARIABLE,
                    COLUMN_VALUE_PAIRS
            );

    static final String ASSIGN_USER_TO_TASK =
            String.format("INSERT INTO %s (task_id, user_id) VALUES (?, ?)",
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
            );

    static final String GET_TASK_USERS_STATEMENT =
            String.format("SELECT * FROM %s, users WHERE %s.user_id = users.id AND (task_id = ?)",
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE,
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
            );

    static final String GET_TASK_STATEMENT =
            String.format("SELECT * FROM %s WHERE ID = ?",
                    TABLE_TASK_NAME_VARIABLE
            );

    static final String DELETE_TASKS_USER_BY_ID_STATEMENT =
            String.format("DELETE FROM %s WHERE (task_id = ? AND user_id = ?)",
                    TABLE_TASK_USER_JUNCTION_NAME_VARIABLE
            );

    static final String DROP_TABLES_STATEMENT =
            String.format("DROP TABLE IF EXISTS  %s",
                    TABLE_NAME_VARIABLE
            );
}