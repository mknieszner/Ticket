package ticketproject.app.crud.dao;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.types.ColumnValue;

public interface ColumnValueRepository extends CrudRepository<ColumnValue, Long> {

  @Override
  @Cacheable("ColumnValueById")//https://github.com/spring-projects/spring-data-examples/blob/0ddb2ba0d6529f0554d498bb72bab5d01b33b6ac/jpa/example/src/main/java
    // /example/springdata/jpa/caching/CachingUserRepository.java
  ColumnValue findOne(Long Id);
}