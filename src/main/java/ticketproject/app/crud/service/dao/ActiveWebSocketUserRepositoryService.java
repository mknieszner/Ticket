package ticketproject.app.crud.service.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
//@CacheConfig(cacheNames = "active-users")
public class ActiveWebSocketUserRepositoryService {
  private final ActiveWebSocketUserRepository activeWebSocketUserRepository;

  //@Cacheable
  public void save(final ActiveWebSocketUser activeWebSocketUser) {
    activeWebSocketUserRepository.save(activeWebSocketUser);
  }

  //@Cacheable
  public List<ActiveWebSocketUser> findAllById(final String id) {
    return activeWebSocketUserRepository.findAllById(id);
  }

  //@CacheEvict
  public void deleteAllById(final String id) {
    activeWebSocketUserRepository.deleteAllById(id);
  }
}
