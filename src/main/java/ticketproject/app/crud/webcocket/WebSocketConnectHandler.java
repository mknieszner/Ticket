package ticketproject.app.crud.webcocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import ticketproject.app.crud.dao.ActiveWebSocketUserRepository;
import ticketproject.app.crud.domain.entities.chat.ActiveWebSocketUser;
import ticketproject.app.crud.service.UserService;

import java.security.Principal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;

public class WebSocketConnectHandler<S> implements ApplicationListener<SessionConnectEvent> {
  private ActiveWebSocketUserRepository repository;
  private SimpMessageSendingOperations messagingTemplate;
  @Autowired
  private UserService userService;

  public WebSocketConnectHandler(
      SimpMessageSendingOperations messagingTemplate,
      ActiveWebSocketUserRepository repository) {
    super();
    this.messagingTemplate = messagingTemplate;
    this.repository = repository;
  }

  public void onApplicationEvent(SessionConnectEvent event) {
    System.out.println("SessionConnectEvent" + event);
    MessageHeaders headers = event.getMessage().getHeaders();
    Principal user = SimpMessageHeaderAccessor.getUser(headers);
    if(user == null) {
      return;
    }
    String id = SimpMessageHeaderAccessor.getSessionId(headers);
    repository.save(new ActiveWebSocketUser(id, user.getName()));
     messagingTemplate.convertAndSend("/topic/people/chat",userService.getLoggedUsers());
  }
}