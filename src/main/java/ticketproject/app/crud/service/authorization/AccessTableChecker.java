package ticketproject.app.crud.service.authorization;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.RowRepository;
import ticketproject.app.crud.dao.TaskRepository;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.entities.authorization.Role;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AccessTableChecker {
  private final TaskRepository taskRepository;
  private final RowRepository rowRepository;

  public boolean checkUserPermissionByRowId(final Long rowId) {
    String tableName =  rowRepository.findOne(rowId).getProjectTable().getName();
    return checkCurrentUserPermissionByTableName(tableName);
  }

  public boolean checkUserPermissionByTaskId(final Long taskId) {
    String tableName = rowRepository.findByTasks(taskRepository.findOne(taskId)).getProjectTable().getName();
    return checkCurrentUserPermissionByTableName(tableName);
  }

  public boolean checkUserPermissionByTableName(final String tableName) {
    return checkCurrentUserPermissionByTableName(tableName);
  }

  private boolean checkCurrentUserPermissionByTableName(final String tableName) {
    return SecurityContextHolder.getContext()
        .getAuthentication()
        .getAuthorities()
        .stream()
        .anyMatch(authority -> authority.getAuthority().equals(tableName));
  }
}
