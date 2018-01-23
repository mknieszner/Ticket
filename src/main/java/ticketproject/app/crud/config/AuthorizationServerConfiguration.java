package ticketproject.app.crud.config;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.authserver.AuthorizationServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.authserver.OAuth2AuthorizationServerConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {

  @Value("signing-key:ABCDEFGH")
  private String signingKey;

  public AuthorizationServerConfiguration() {
    super();
  }

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserDetailsService userDetailsService;

  @Bean //shared between Servers!
  JwtAccessTokenConverter accessTokenConverter() {
    final JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
    accessTokenConverter.setSigningKey(signingKey);//symmetrical cryptography
    return accessTokenConverter;
  }

  @Bean
  public TokenStore tokenStore() {
    return new JwtTokenStore(accessTokenConverter());
  }

  @Override
  public void configure(final AuthorizationServerEndpointsConfigurer endpoints) {
    endpoints
        .tokenStore(tokenStore())
        .authenticationManager(authenticationManager)
        .userDetailsService(userDetailsService)
        .accessTokenConverter(accessTokenConverter());
  }

//  @Bean //Refresh token
//  @Primary
//  DefaultTokenServices tokenServices() {
//    final DefaultTokenServices tokenServices = new DefaultTokenServices();
//    tokenServices.setTokenStore(tokenStore());
//    tokenServices.setSupportRefreshToken(true);
//    return tokenServices;
//  }

  @Override
  public void configure(final ClientDetailsServiceConfigurer clients) throws Exception {
    // @formatter:off
    clients.inMemory()
        .withClient("live-test")
        .secret("bG2ZS10ZXN0")
        .authorizedGrantTypes("password")//, "refresh_token")  //Refresh token
       // .refreshTokenValiditySeconds(3600 * 24)  //Refresh token
        .scopes("um-webapp")
        .autoApprove("um-webbapp")
        .accessTokenValiditySeconds(3600);
    // @formatter:on
  }

  @Override
  public void configure(final AuthorizationServerSecurityConfigurer security) throws Exception {
    security.checkTokenAccess("permitAll()");
    super.configure(security);
  }
}
