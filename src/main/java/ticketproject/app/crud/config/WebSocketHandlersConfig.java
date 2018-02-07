package ticketproject.app.crud.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.session.ExpiringSession;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.service.dao.ActiveWebSocketUserRepositoryService;
import ticketproject.app.crud.webcocket.WebSocketConnectHandler;
import ticketproject.app.crud.webcocket.WebSocketDisconnectHandler;

@Configuration
public class WebSocketHandlersConfig<S extends ExpiringSession> {

  @Bean
  public WebSocketConnectHandler<S> webSocketConnectHandler(
      SimpMessageSendingOperations messagingTemplate,
      ActiveWebSocketUserRepositoryService repository) {

    return new WebSocketConnectHandler<S>(messagingTemplate, repository);
  }

  @Bean
  public WebSocketDisconnectHandler<S> webSocketDisconnectHandler(
      SimpMessageSendingOperations messagingTemplate,
      ActiveWebSocketUserRepositoryService repository) {
    return new WebSocketDisconnectHandler<S>(messagingTemplate, repository);
  }
}
