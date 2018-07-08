package ticketproject.app.crud.service.helper;

import lombok.*;
import ticketproject.app.crud.domain.dto.values.column.*;
import ticketproject.app.crud.domain.entities.ColumnDetail;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.function.BiFunction;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ColumnType {
    private Types type;
    public static final String IN = "IN";
    public static final String EN = "EN";
    public static final String DE = "DE";
    public static final String DT = "DT";
    public static final String ST = "ST";

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public enum Types {
        IN(ColumnType.IN, "%s int ", (resultSet, detail) -> {
            try {
                return new IntValueDto(resultSet.getInt(detail.getName()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }),
        EN(ColumnType.EN, "%s varchar(50) ", (resultSet, detail) -> {
            try {
                return new EnumValueDto(resultSet.getString(detail.getName()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }),
        DE(ColumnType.DE, "%s varchar(5000) ", (resultSet, detail) -> {
            try {
                return new DescriptionValueDto(resultSet.getString(detail.getName()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }),
        DT(ColumnType.DT, "%s timestamp ", (resultSet, detail) -> {
            try {
                return new DateValueDto(resultSet.getObject(detail.getName(), LocalDateTime.class));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }),
        ST(ColumnType.ST, "%s varchar(50) ", (resultSet, detail) -> {
            try {
                return new ShortTextValueDto(resultSet.getString(detail.getName()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
        private String name;
        private String sqlCreationVariable;
        private BiFunction<ResultSet, ColumnDetail, ColumnValueDto> getValueFunction;

        public static BiFunction<ResultSet, ColumnDetail, ColumnValueDto> getGetValueFunction(ColumnDetail detail) {
            return detail.getType().getValueFunction;
        }
    }
}
