package ticketproject.app.crud.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
  @Autowired
  UserService userService;

//  @Test
//  public void registerUser() throws Exception {
//    userService.registerNewUserAccount(new UserDto("MATkni","MAT","KNI","mail@mail.com","password",true));
//
//  }

  @Test
  public void loadUserByUsername() throws Exception {
    UserDetails user = userService.loadUserByUsername("mk");
    System.out.println(user);
  }

}