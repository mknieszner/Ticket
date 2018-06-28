package ticketproject.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

@Component
public enum DbManager {
    INSTANCE;

    @Value("${spring.jpa.database}")
    private String database;
    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;

    private Connection conn;

    DbManager() {
        try {
            conn = DriverManager.getConnection("jdbc:" + database + url, username, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Connection getConnection() {
        return conn;
    }
}