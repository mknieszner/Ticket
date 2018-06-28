package ticketproject.app.crud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.web.servlet.config.annotation.*;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
//@ComponentScan( {"ticketproject.app.*" })
public class MvcConfig extends WebMvcConfigurerAdapter {

//  @Override
//  public void addViewControllers(ViewControllerRegistry registry) {
//    registry.addViewController("/home").setViewName("home");
//    registry.addViewController("/").setViewName("home");
//    registry.addViewController("/administration").setViewName("administration");
//    registry.addViewController("/login").setViewName("login");
//  }

  @Bean
  public DataSource myDataSource() {
    DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
    driverManagerDataSource.setDriverClassName("com.mysql.jdbc.Driver");
    driverManagerDataSource.setUrl("jdbc:mysql://localhost:3306/ticket_system?serverTimezone=Europe/Warsaw"
        + "&useSSL=False");
    driverManagerDataSource.setUsername("ticket_admin");
    driverManagerDataSource.setPassword("ticket_password");
    return driverManagerDataSource;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/resources/**")
        .addResourceLocations("/resources/");
        //.setCachePeriod(31556926);
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*");//
      }
    };
  }
}