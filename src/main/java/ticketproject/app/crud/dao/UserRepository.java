package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

public interface UserRepository extends CrudRepository<User, Long> {
  void deleteById(Long id);
  boolean findAllByUsernameAndRoles(String username, Role role);
  User findByUsername(String username);
  void deleteByUsername(String username);
  Set<User> findAllByRolesEquals(Role role);
}