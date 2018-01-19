package ticketproject.app.crud.Dao;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ticketproject.app.crud.domain.entities.ProjectTable;

import javax.transaction.Transactional;

public interface ProjectTableRepository extends CrudRepository<ProjectTable, Long> {
  @Override
  @Cacheable("TableById")//https://github.com/spring-projects/spring-data-examples/blob/0ddb2ba0d6529f0554d498bb72bab5d01b33b6ac/jpa/example/src/main/java
    // /example/springdata/jpa/caching/CachingUserRepository.java
  ProjectTable findOne(Long Id);

  ProjectTable findValuesById(@Param("TABLE_ID") Long tableId);

  ProjectTable findByName(String roleName);

  @Transactional
  void deleteByName(String tableName);
}
