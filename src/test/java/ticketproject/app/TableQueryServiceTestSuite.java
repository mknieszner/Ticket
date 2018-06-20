package ticketproject.app;


import org.junit.Test;
import org.springframework.util.Assert;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TableQueryServiceTestSuite {

    @Test
    public void getConnectionTest() {
        //Given & When
        DbManager dbManager = DbManager.INSTANCE;
        //Then
        Assert.notNull(dbManager,"dbManager is Null");
    }

    @Test
    public void testQuery() throws SQLException {
        //Given
        DbManager dbManager = DbManager.INSTANCE;
        //When
        String sqlQuery = "SELECT * FROM USERS";
        Statement statement = dbManager.getConnection().createStatement();
        ResultSet rs = statement.executeQuery(sqlQuery);

        //Then
        while(rs.next()) {
            System.out.println(rs.getInt("ID"));
        }
        dbManager.getConnection().close();
    }
}
