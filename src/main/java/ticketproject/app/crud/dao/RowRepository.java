package ticketproject.app.crud.dao;

import org.springframework.data.repository.CrudRepository;
import ticketproject.app.crud.domain.entities.Row;

import java.util.List;


public interface RowRepository extends CrudRepository<Row, Long> {
  @Override
  Row findOne(Long Id);
  Row findByProjectTableIdAndId(Long tableId, Long rowId);
  List<Row> findAllByProjectTable_Id(Long tableId);
  List<Row> findAllByProjectTable_Name(String tableName);
}
