package ticketproject.app.crud.service.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketproject.app.crud.dao.RoleRepository;
import ticketproject.app.crud.domain.entities.authorization.Role;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RoleRepositoryService {
    private final RoleRepository roleRepository;

    public Role findByName(final String roleName) {
        return roleRepository.findByName(roleName);
    }

    public Role save(final Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findAllByUsers_Username(final String username) {
        return roleRepository.findAllByUsers_Username(username);
    }

    public void deleteByName(final String roleName) {
        roleRepository.deleteByName(roleName);
    }

    public Iterable<Role> findAll() {
        return roleRepository.findAll();
    }
}
