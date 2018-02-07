package ticketproject.app.crud.service.dao;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.dao.UserRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CacheConfig(cacheNames = "users")
public class UserRepositoryService {
  private final UserRepository userRepository;
  private final Logger logger = LoggerFactory.getLogger(UserRepositoryService.class);

  @Cacheable(key = "#username")
  public User findByUsername(final String username) {
    logger.info("cached missed for findByUsername" + username);

    return userRepository.findByUsername(username);
  }

  @CachePut(key = "#user.username")
  public User save(final User user) {
    logger.info("cached save" + user);
    return userRepository.save(user);
  }

  @CacheEvict(key = "#username")
  public void deleteByUsername(final String username) {
    logger.info("cache deleteByUsername" + username);
    userRepository.deleteByUsername(username);
  }

  @Cacheable
  public Iterable<User> findAll() {
    logger.info("cached missed for findAll");
    return userRepository.findAll();
  }

  //@Cacheable(value = "users")// TODO Evict on rolechanges!!!
  public Set<User> findAllByRolesEquals(final Role role) {
    return userRepository.findAllByRolesEquals(role);
  }
}
