package ticketproject.app.crud.service.authorization;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TableAccessManager {
  private final AccessTableChecker accessTableChecker;

  public boolean hasTableAccessAuthorityBy(final Long tableId) {
    return accessTableChecker.checkUserPermissionBy(tableId);
  }

  public boolean hasTableAccessAuthorityByRowId(final Long rowId) {
    return accessTableChecker.checkUserPermissionByRowId(rowId);
  }
}
