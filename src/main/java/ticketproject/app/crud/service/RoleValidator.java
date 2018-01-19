package ticketproject.app.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ticketproject.app.crud.Dao.ProjectTableRepository;
import ticketproject.app.crud.Dao.RoleRepository;
import ticketproject.app.crud.Dao.UserRepository;

import java.util.List;

@Component
public class RoleValidator {
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private ProjectTableRepository projectTableRepository;
  @Autowired
  private UserRepository userRepository;

  public boolean validateTableAccessByUsername(final List<String> roleList, final Long tableId) {
    return roleList.contains((projectTableRepository.findOne(tableId)).getName());
  }
}
