package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.types.ColumnValue;

public interface ColumnValueRepository extends CrudRepository<ColumnValue, Long> {

  @Override
  ColumnValue findOne(Long Id);
}
