package ticketproject.app.crud.service.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ActiveWebSocketUserRepositoryService {
  private final ActiveWebSocketUserRepository activeWebSocketUserRepository;


  public void save(final ActiveWebSocketUser activeWebSocketUser) {
    activeWebSocketUserRepository.save(activeWebSocketUser);
  }

  public List<ActiveWebSocketUser> findAllById(final String id) {
    return activeWebSocketUserRepository.findAllById(id);
  }

  public void deleteAllById(final String id) {
    activeWebSocketUserRepository.deleteAllById(id);
  }
}
