package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public void addTodo(Todo todo) {
        todoRepository.save(todo);
    }

    public List<Todo> getAllTodosByUser(User user) {
        List<Todo> listTodos = todoRepository.findAllByUser(user);
        return listTodos;
    }
}
