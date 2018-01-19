package ticketproject.app;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


public enum DbManager {
  INSTANCE;
  private Connection conn;

  DbManager() {
    final Properties connectionProps = new Properties();
    connectionProps.put("user", "ticket_admin");
    connectionProps.put("password", "ticket_password");
    try {
      conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ticket_system?serverTimezone=Europe/Warsaw"
          + "&useSSL=False",connectionProps);
    } catch (SQLException e) {
      throw new RuntimeException("SQLException" + e.toString());
    }
  }

  public Connection getConnection() {
    return conn;
  }
}