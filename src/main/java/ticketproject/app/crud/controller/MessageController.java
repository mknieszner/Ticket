package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import ticketproject.app.crud.domain.dto.chat.ChatMessage;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.service.TaskInfoService;
import ticketproject.app.crud.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@CrossOrigin("*")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class MessageController {
  private final SimpMessagingTemplate messagingTemplate;
  private final TaskInfoService taskInfoService;
  private final UserService userService;

  @MessageMapping("/newTasks/{username}")
  @SendTo("/topic/newTasks/{username}")
  public List<TaskDto> sendUserTasksMessage(@PathVariable @DestinationVariable("username") final String username) throws Exception {
    return taskInfoService.getUserTasks(username);
  }

  @MessageMapping("/chat")
  @SendTo("/topic/chat")
  public ChatMessage sendChatMessage(final String messageContent, final Principal principal) throws Exception {
    return new ChatMessage(principal.getName(),messageContent,"global");
  }

  @MessageMapping("/chat/{username}")
  @SendTo("/topic/chat/{username}")
  public ChatMessage sendDirectUserChatMessage(@PathVariable @DestinationVariable("username") final String username, final String messageContent, final
  Principal principal) throws Exception {
    return new ChatMessage(principal.getName(),messageContent,username);
  }

  @MessageMapping("/people/chat")
  @SendTo("/topic/people/chat")
  public List<String> getLoggedUsers() throws Exception {
    messagingTemplate.convertAndSend("/topic/people/chat",userService.getLoggedUsers());
    return userService.getLoggedUsers();
  }
}
