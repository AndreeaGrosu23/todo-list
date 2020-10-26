package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("todo")
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUser(User user);

}
