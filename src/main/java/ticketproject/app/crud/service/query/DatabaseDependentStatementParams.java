package ticketproject.app.crud.service.query;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum DatabaseDependentStatementParams {
    mysql("BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT"),
    postgresql("SERIAL PRIMARY KEY");

    @Getter private String autoIncrement;
}