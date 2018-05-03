package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.types.Option;

public interface OptionsRepository extends CrudRepository<Option, Long> {

  @Override
  Option findOne(Long Id);
}
