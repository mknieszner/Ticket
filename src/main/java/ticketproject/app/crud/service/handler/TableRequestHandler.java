package ticketproject.app.crud.service.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.dao.ProjectRepository;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.domain.dto.definition.ProjectDefinitionDto;
import ticketproject.app.crud.domain.dto.definition.TableDefinitionDto;
import ticketproject.app.crud.domain.dto.values.RowDto;
import ticketproject.app.crud.domain.entities.ColumnDetail;
import ticketproject.app.crud.service.DatabaseEnviroment;
import ticketproject.app.crud.service.RowValidator;
import ticketproject.app.crud.service.TableService;
import ticketproject.app.crud.service.UserService;
import ticketproject.app.crud.service.query.TableQueryService;

import javax.transaction.Transactional;

import java.util.List;

import static ticketproject.app.crud.service.DatabaseEnviroment.COMMON_TABLE_ENVIRONMENT;

@Component
@RequiredArgsConstructor
public class TableRequestHandler {
    private final UserService userService;
    private final TableQueryService tableQueryService;
    private final TableService tableService;
    private final ProjectRepository projectRepository;
    private final ProjectTableRepository projectTableRepository;
    private final RowValidator rowValidator;

    @Transactional
    public ProjectDefinitionDto handleTableDefinitionRequest(TableDefinitionDto tableDefinitionDto,
                                                             DatabaseEnviroment dbEnvironment) {
        userService.saveRoleName(tableDefinitionDto.getName());

        ProjectDefinitionDto projectDefinitionDto = tableService.defineSingleTableProject(
                tableDefinitionDto,
                COMMON_TABLE_ENVIRONMENT
        );

        switch (dbEnvironment) {
            case COMMON_TABLE_ENVIRONMENT: {
                break;
            }
            case SEPARATE_TABLE_ENVIRONMENT: {
                tableQueryService.defineTable(tableDefinitionDto);
                break;
            }
            default:
                throw new RuntimeException("Unknown table environment mode" + dbEnvironment);
        }
        return projectDefinitionDto;
    }

    public RowDto handleAddRowRequest(String tableName, RowDto rowDto){
        RowDto savedRowDto;
        rowValidator.validateRow(getTableIdByName(tableName), rowDto);
        DatabaseEnviroment dbEnvironment = getDatabaseEnvironmentByTableName(tableName);
        switch (dbEnvironment) {
            case COMMON_TABLE_ENVIRONMENT: {
                savedRowDto = tableService.addRow(rowDto, tableName);
                break;
            }
            case SEPARATE_TABLE_ENVIRONMENT: {
                savedRowDto = tableQueryService.addRow(rowDto, tableName);
                break;
            }
            default:
                throw new RuntimeException("Unknown table environment mode" + dbEnvironment);
        }
        return savedRowDto;
    }


    public List<RowDto> getTableRowsByTableName(String tableName) {
        List<RowDto> rows;
        DatabaseEnviroment databaseEnviroment = getDatabaseEnvironmentByTableName(tableName);

        switch (databaseEnviroment) {
            case COMMON_TABLE_ENVIRONMENT: {
                rows = tableService.getTableRowsByTableName(tableName);
                break;
            }
            case SEPARATE_TABLE_ENVIRONMENT: {
                List<ColumnDetail> columnsDetails = getColumnsDetails(tableName);
                rows = tableQueryService.getRows(tableName, columnsDetails);
                break;
            }
            default:
                throw new RuntimeException("Unknown table environment mode" + databaseEnviroment);
        }
        return rows;
    }

    public boolean handleDeleteRowRequest(String tableName, Long rowId) {
        boolean done = true;
        DatabaseEnviroment databaseEnviroment = getDatabaseEnvironmentByTableName(tableName);
        switch (databaseEnviroment) {
            case COMMON_TABLE_ENVIRONMENT: {
                tableService.deleteRowById(rowId);
                break;
            }
            case SEPARATE_TABLE_ENVIRONMENT: {
                done = this.tableQueryService.deleteRowById(tableName, rowId);
                break;
            }
            default:
                throw new RuntimeException("Unknown table environment mode" + databaseEnviroment);
        }

        return done;
    }

    private DatabaseEnviroment getDatabaseEnvironmentByTableName(final String name){
        return projectRepository.findByName(name).getDatabaseEnviroment();
    }

    private List<ColumnDetail> getColumnsDetails(final String name) {
        return projectTableRepository.findByName(name).getColumnDetails();
    }

    private Long getTableIdByName(final String tableName) {
        return projectTableRepository.findByName(tableName).getId();
    }
}
