package ticketproject.app.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ticketproject.app.crud.dao.RoleRepository;
import ticketproject.app.crud.dao.UserRepository;
import ticketproject.app.crud.domain.dto.authorization.UserDto;
import ticketproject.app.crud.domain.entities.authorization.User;
import ticketproject.app.crud.mapper.UserMapper;

import java.util.ArrayList;

@RestController
public class HelloController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserMapper userMapper;

    @GetMapping(value = "/hello")
    public String hello() {
        return "index";
    }

    @GetMapping(value = "/init")
    public User init() {
        UserDto userDto = new UserDto("mk",
                "m",
                "k",
                "mk@mk.pl",
                "mk",
                true,
                new ArrayList<>()
        );
        userDto.addRoleDto("ROLE_USER");
        userDto.addRoleDto("ROLE_ADMIN");
        User user = userMapper.mapUserDtoToUser(
                userDto
        );
        user.addRole(roleRepository.findByName("ROLE_USER"));
        user.addRole(roleRepository.findByName("ROLE_USER"));
        userRepository.save(user);
        return user;
    }
}
