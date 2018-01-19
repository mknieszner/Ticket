package ticketproject.app;

import static org.junit.Assert.assertNotNull;

//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class AuthorizationTestSuite {
//  @Autowired
//  UserRepository userRepository;
//  @Autowired
//  RoleRepository roleRepository;
//
//  @Test
//  public void saveUser() {
//    Role role = new Role("USERS");
//    User user = new User("mk","","","","mk",true);
//    user.addRole(role);
//    User savedUser = userRepository.save(user);
//    assertNotNull(savedUser);
//  }
//
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
