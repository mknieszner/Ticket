package ticketproject.app.crud.service;

import com.google.common.collect.ImmutableMap;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectRepository;
import ticketproject.app.crud.service.handler.TableRequestHandler;

import javax.annotation.PostConstruct;
import java.util.Map;

import static ticketproject.app.crud.service.DatabaseEnvironment.Environments.COMMON_TABLE_ENVIRONMENT;
import static ticketproject.app.crud.service.DatabaseEnvironment.Environments.SEPARATE_TABLE_ENVIRONMENT;

@Component
public class DatabaseEnvironment {
    public static final String COMMON_TABLE_REQUEST_HANDLER_BEAN_NAME = "commonTableRequestHandler";
    public static final String SEPARATE_TABLE_REQUEST_HANDLER_BEAN_NAME = "separateTableRequestHandler";

    private final ProjectRepository projectRepository;
    private final TableRequestHandler commonTableRequestHandler;
    private final TableRequestHandler separateTableRequestHandler;

    public Map<Environments, TableRequestHandler> handlerMap;

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public enum Environments {
        COMMON_TABLE_ENVIRONMENT(COMMON_TABLE_REQUEST_HANDLER_BEAN_NAME),
        SEPARATE_TABLE_ENVIRONMENT(SEPARATE_TABLE_REQUEST_HANDLER_BEAN_NAME);
        private String beanNames;
    }

    @Autowired
    public DatabaseEnvironment(final ProjectRepository projectRepository,
                               @Qualifier(COMMON_TABLE_REQUEST_HANDLER_BEAN_NAME) final TableRequestHandler commonTableRequestHandler,
                               @Qualifier(SEPARATE_TABLE_REQUEST_HANDLER_BEAN_NAME) final TableRequestHandler separateTableRequestHandler) {
        this.projectRepository = projectRepository;
        this.commonTableRequestHandler = commonTableRequestHandler;
        this.separateTableRequestHandler = separateTableRequestHandler;
    }

    @PostConstruct
    private void setup() {
        handlerMap = ImmutableMap.<Environments, TableRequestHandler>builder()
                .put(SEPARATE_TABLE_ENVIRONMENT, separateTableRequestHandler)
                .put(COMMON_TABLE_ENVIRONMENT, commonTableRequestHandler)
                .build();
    }

    public TableRequestHandler getHandler(String tableName) {
        return getHandler(getDatabaseEnvironmentByTableName(tableName));
    }

    public TableRequestHandler getHandler(Environments databaseEnvironment) {
        return handlerMap.get(databaseEnvironment);
    }

    private Environments getDatabaseEnvironmentByTableName(final String name) {
        return projectRepository.findByName(name).getDatabaseEnvironment();
    }
}
