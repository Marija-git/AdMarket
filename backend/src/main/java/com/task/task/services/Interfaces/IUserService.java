package com.task.task.services.Interfaces;
import com.task.task.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {

    void register(String username, String password, String phone);

    User findByUsername(String username);
}

