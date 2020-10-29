package com.example.TodoList;

import com.example.TodoList.ToDo.Todo;
import com.example.TodoList.ToDo.TodoRepository;
import com.example.TodoList.User.User;
import com.example.TodoList.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;


@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    private final TodoRepository todoRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) {

        User user = new User("Andreea");
        userRepository.save(user);

    }


}
