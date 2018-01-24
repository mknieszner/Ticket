package ticketproject.app.crud.oauth;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import ticketproject.app.crud.service.UserService;

import java.util.*;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class OauthTestSuite {
  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  MockMvc mockMvc;
  private MultiValueMap<String,String> params = new LinkedMultiValueMap<>();

  @Test
  public void obtainToken() throws Exception {
    //Given
    params.put("grant_type", Collections.singletonList("password"));
    params.put("client_id",Collections.singletonList("live-test"));
    params.put("username",Collections.singletonList("mk"));
    params.put("password",Collections.singletonList("mk"));

    //When & Then
    mockMvc.perform(
        post("/oauth/token").with(client())
        .params(params))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  public void getHash(){
    System.out.println(passwordEncoder.encode("user"));
  }

  public static RequestPostProcessor client() {
    return user("live-test").password("bG2ZS10ZXN0");
  }

}