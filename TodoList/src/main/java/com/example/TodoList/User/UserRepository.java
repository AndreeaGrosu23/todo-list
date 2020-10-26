package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
