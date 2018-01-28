package ticketproject.app.crud.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ticketproject.app.crud.domain.dto.authorization.UserDto;
import ticketproject.app.crud.domain.dto.values.TaskDto;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.service.TaskInfoService;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class MessageController {
  private final SimpMessagingTemplate messagingTemplate;
  private final TaskInfoService taskInfoService;

  @MessageMapping("/newTasks/{username}")
  @SendTo("/topic/newTasks/{username}")
  public List<TaskDto> sendUserTasksMessage(@PathVariable @DestinationVariable("username") String username) throws Exception {
    return taskInfoService.getUserTasks(username);
  }
}
