package ticketproject.app.crud.service.authorization;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.service.UserService;

import java.security.Principal;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableAccessManager {
  private final AccessTableChecker accessTableChecker;

  public boolean hasTableAccessAuthorityByTableName(final String tableName) {
    return accessTableChecker.checkUserPermissionByTableName(tableName);
  }

  public boolean hasTableAccessAuthorityByRowId(final Long rowId) {
    return accessTableChecker.checkUserPermissionByRowId(rowId);
  }

  public boolean hasTableAccessAuthorityByTaskId(final Long taskId) {
    return accessTableChecker.checkUserPermissionByTaskId(taskId);
  }
}
