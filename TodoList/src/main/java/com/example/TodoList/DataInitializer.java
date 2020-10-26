package com.example.TodoList;

import com.example.TodoList.ToDo.TaskType;
import com.example.TodoList.ToDo.Todo;
import com.example.TodoList.ToDo.TodoRepository;
import com.example.TodoList.User.User;
import com.example.TodoList.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

import java.util.Date;

@Component
//@Slf4j
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final TodoRepository todoRepository;

    public DataInitializer(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) {

        User user = new User("Andreea");
        userRepository.save(user);

        Todo todo = new Todo("Hobby", "Go out for a walk", LocalDate.of(2020, 11, 3), 1, user);
        todoRepository.save(todo);
    }


}
