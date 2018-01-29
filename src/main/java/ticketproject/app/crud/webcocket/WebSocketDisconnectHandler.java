package ticketproject.app.crud.webcocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;
import ticketproject.app.crud.service.UserService;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component

public class WebSocketDisconnectHandler<S> implements ApplicationListener<SessionDisconnectEvent> {
  private ActiveWebSocketUserRepository repository;
  private SimpMessageSendingOperations messagingTemplate;
  @Autowired
  private UserService userService;

  public WebSocketDisconnectHandler(
      SimpMessageSendingOperations messagingTemplate,
      ActiveWebSocketUserRepository repository) {
    super();
    this.messagingTemplate = messagingTemplate;
    this.repository = repository;
  }

  @Transactional
  public void onApplicationEvent(SessionDisconnectEvent event) {
    System.out.println("SessionDisconnectEvent " + event);
    String id = event.getSessionId();
    if (id == null) {
      return;
    }
    List<ActiveWebSocketUser> users = repository.findAllById(id);
    if (users.size() <= 0) {
      return;
    }
    repository.deleteAllById(id);
    messagingTemplate.convertAndSend("/topic/people/chat",userService.getLoggedUsers());
  }
}