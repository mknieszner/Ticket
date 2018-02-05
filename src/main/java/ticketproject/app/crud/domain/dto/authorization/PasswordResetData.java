package ticketproject.app.crud.domain.dto.authorization;

import lombok.Getter;

@Getter
public class PasswordResetData {
  String oldPassword;
  String newPassword;
}
