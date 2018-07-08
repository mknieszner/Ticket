package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ticketproject.app.crud.domain.entities.ProjectTable;

import javax.transaction.Transactional;

public interface ProjectTableRepository extends CrudRepository<ProjectTable, Long> {
  ProjectTable findOne(Long id);

  ProjectTable findValuesById(@Param("TABLE_ID") Long tableId);

  ProjectTable findByName(String roleName);

  @Transactional
  void deleteByName(String tableName);
}
