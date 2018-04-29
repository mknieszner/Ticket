package ticketproject.app;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import ticketproject.app.crud.dao.RoleRepository;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.entities.authorization.Role;
import ticketproject.app.crud.domain.entities.authorization.User;

import java.util.ArrayList;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthorizationTestSuite {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void saveUser() {
        Role role = new Role("USERS");
        User user = new User("m", "m", "k", "m@k.pl", passwordEncoder.encode("m"), true, new ArrayList<>());
        user.addRole(role);
        User savedUser = userRepository.save(user);
        assertNotNull(savedUser);
    }
//
    @Test
    public void showPassword() {
        System.out.println(passwordEncoder.encode("mk"));
    }
}
//  @Test
//  public void saveUserNoRole() {
//    User user = new User("rand","","","","rand",true);
//    User savedUser = userRepository.save(user);
//    assertNotNull(savedUser);
//  }
//
//  @Test
//  public void addRoleToUser() {
//    User user = userRepository.findOne(3L);
//    Role role = new Role("TABLE2");
//    user.addRole(role);
//    userRepository.save(user);
//  }
//
//  @Test
//  public void deleteUser() {
//   userRepository.deleteById(1L);
//  }
//
//  @Test
//  public void deleteUserRole() {
//    roleRepository.delete(2L);
//  }
//
//  @Test
//  public void getUserRole() {
//    System.out.println(roleRepository.findOne(2L));
//  }
//}
