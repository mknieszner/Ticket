package ticketproject.app.crud.config;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;


//@Configuration
//@EnableWebMvcSecurity
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//  @Qualifier("myDataSource")
//  @Autowired
//  DataSource dataSource;

//  @Bean
//  public AuthenticationManager customAuthenticationManager() throws Exception {
//    return authenticationManager();
//  }


//  @Autowired
//  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//    auth
//        .authenticationProvider(authProvider());
////        .jdbcAuthentication().dataSource(dataSource)
////        .usersByUsernameQuery(
////            "select username, password, enabled from users where username=?")
////        .authoritiesByUsernameQuery(
////            "SELECT users.username as username, roles.name as authority "
////            + "FROM users JOIN roles JOIN users_roles "
////            + "WHERE users.username = ? "
////            + "AND users_roles.user_id = users.id "
////            + "AND roles.id = users_roles.role_id");
//  }

//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    http
//        //.csrf().disable()
//        .authorizeRequests()
//        .antMatchers("/**").permitAll();
        //.csrf().disable()
//        .authorizeRequests()
//        .antMatchers("/", "/home","/css/**","/images/**").permitAll()
//        //.antMatchers("/administration").hasRole("ADMIN")
//        .anyRequest().authenticated()
//        .and()
//        .formLogin()
//        .loginPage("/login")
//        .permitAll()
//        .and().rememberMe().key("testKey").userDetailsService(this.userService)
//        .and()
//        .logout()
//        .permitAll();
//  }
//
//}