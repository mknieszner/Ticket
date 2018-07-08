package ticketproject.app.crud.service.authorization;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.ProjectTableRepository;
import ticketproject.app.crud.dao.RowRepository;
import ticketproject.app.crud.dao.TaskRepository;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AccessTableChecker {
  private final TaskRepository taskRepository;
  private final RowRepository rowRepository;
  private final ProjectTableRepository projectTableRepository;

  public boolean checkUserPermissionByRowId(final Long rowId) {
    String tableName =  rowRepository.findOne(rowId).getProjectTable().getName();
    return checkCurrentUserPermissionBy(tableName);
  }

  public boolean checkUserPermissionByTaskId(final Long taskId) {
    String tableName = rowRepository.findByTasks(taskRepository.findOne(taskId)).getProjectTable().getName();
    return checkCurrentUserPermissionBy(tableName);
  }

  public boolean checkUserPermissionBy(final Long tableId) {
    return checkCurrentUserPermissionBy(tableId);
  }

  private boolean checkCurrentUserPermissionBy(final String tableName) {
    return SecurityContextHolder.getContext()
        .getAuthentication()
        .getAuthorities()
        .stream()
        .anyMatch(authority -> authority.getAuthority().equals(tableName));
  }

  private boolean checkCurrentUserPermissionBy(final Long tableId) {
    return SecurityContextHolder.getContext()
        .getAuthentication()
        .getAuthorities()
        .stream()
        .anyMatch(authority -> authority.getAuthority().equals(projectTableRepository.findOne(tableId).getName()));
  }
}
