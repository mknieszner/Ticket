package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ticketproject.app.crud.domain.entities.Task;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {
  @Override
  void delete(Long id);

  void deleteById(Long id);
}
