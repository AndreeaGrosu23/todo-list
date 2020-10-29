package com.example.TodoList;

import com.example.TodoList.User.User;
import com.example.TodoList.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {

        User user = new User("John Doe");
        userRepository.save(user);
    }


}
