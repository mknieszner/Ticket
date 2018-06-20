package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.Project;

public interface ProjectRepository extends CrudRepository<Project, Long> {

  @Override
  Project findOne(Long Id);

  Project findByName(String name);
}
