package ticketproject.app.crud.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatMessage {
  private String senderName;
  private String message;
}
