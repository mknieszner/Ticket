package ticketproject.app.crud.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
@EnableWebSecurity
@ComponentScan("ticketproject.app.crud")
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true)

public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

  @Autowired
  private UserDetailsService userDetailsService;

  public ResourceServerConfiguration() {
    super();
  }

  @Bean
  public DaoAuthenticationProvider authProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(encoder());
    return authProvider;
  }

  @Autowired
  public void configureGlobal(final AuthenticationManagerBuilder auth) {
    auth.authenticationProvider(authProvider());
  }

  @Override
  public void configure(final HttpSecurity http) throws Exception {
    http.authorizeRequests()
        .anyRequest().authenticated()
//        .antMatchers(HttpMethod.GET,"/v1/**").access("#oauth2.hasScope('read')")
//        .antMatchers(HttpMethod.POST,"/v1/**").access("#oauth2.hasScope('write')")
//        .antMatchers(HttpMethod.DELETE,"/v1/**").access("#oauth2.hasScope('write')")
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .csrf().disable()
        .cors().disable();
  }

  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }
}
