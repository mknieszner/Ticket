//package ticketproject.app.crud.domain.entities.authorization;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Entity
//@Table(name = "GROUP_AUTHORITIES")
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//@Setter
//public class GroupAuthority {
//  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  @Column(name = "ID")
//  private Long Id;
//
//  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//  @JoinColumn(name = "AUTHORITY")
//  private Authority authority;
//
//  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//  @JoinColumn(name = "GROUP_ID")
//  private Group group;
//}
