package ticketproject.app.crud.domain.entities.chat;

import lombok.*;

import javax.persistence.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "ACTIVE_WEB_SOCKET_USER")
public class ActiveWebSocketUser {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long userId;

  public ActiveWebSocketUser(String id, String name) {
    this.id = id;
    this.name = name;
  }

  private String id;

  private String name;
}
