package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;

import java.util.List;

public interface ActiveWebSocketUserRepository extends CrudRepository<ActiveWebSocketUser, String> {
  List<ActiveWebSocketUser> findAllById(String id);
  void deleteAllById(String id);
  List<ActiveWebSocketUser> findAll();
}
