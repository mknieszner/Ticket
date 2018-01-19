//package ticketproject.app.crud.config;
//
//import org.apache.catalina.Context;
//import org.apache.catalina.connector.Connector;
//import org.apache.coyote.http11.Http11NioProtocol;
//import org.apache.tomcat.util.descriptor.web.SecurityCollection;
//import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
//import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
//import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
//import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SSLConfig {
//  @Bean
//  public EmbeddedServletContainerFactory servletContainer() {
////    final String keystoreFile = "C:\\Users\\mknie\\OneDrive\\Kodilla\\Tickets\\keystore.p12";
////    final String keystorePass = "password11";
////    final String keystoreType = "pkcs12";
////    final String keystoreAlias = "tomcat";
//
//    TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory() {
//      @Override
//      protected void postProcessContext(Context context) {
//        SecurityConstraint securityConstraint = new SecurityConstraint();
//        securityConstraint.setUserConstraint("CONFIDENTIAL");
//        SecurityCollection collection = new SecurityCollection();
//        collection.addPattern("/**");
//        securityConstraint.addCollection(collection);
//        context.addConstraint(securityConstraint);
//      }
//    };
//
//    factory.addAdditionalTomcatConnectors(initiateHttpConnector());
//    return factory;
//  }
//
//  private Connector initiateHttpConnector() {
//    Connector connector = new Connector();
//    connector.setPort(8080);
//    connector.setRedirectPort(8443);
//    return connector;
//  }
//}
