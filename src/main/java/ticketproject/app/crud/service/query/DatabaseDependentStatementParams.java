package ticketproject.app.crud.service.query;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum DatabaseDependentStatementParams {
    mysql("AUTO_INCREMENT"),
    postgresql("SERIAL");

    @Getter private String autoIncrement;
}