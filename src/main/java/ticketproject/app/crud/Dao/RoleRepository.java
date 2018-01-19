package ticketproject.app.crud.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ticketproject.app.crud.domain.entities.authorization.Role;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
  Role findByName(String name);
  void deleteByName(String name);
  List<Role> findAllByUsers_Username(final String username);
}
