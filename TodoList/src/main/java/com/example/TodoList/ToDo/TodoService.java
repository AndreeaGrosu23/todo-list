package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        List<Todo> listTodos = todoRepository.findAllByUserOrderByCreatedAtDesc(user);
        return listTodos;
    }

    public List<Todo> getAllTodosByUserDeadlineAsc(User user) {
        List<Todo> listTodos = todoRepository.findAllByUserOrderByDeadlineAsc(user);
        return listTodos;
    }

    public List<Todo> getAllTodosByUserDeadlineDesc(User user) {
        List<Todo> listTodos = todoRepository.findAllByUserOrderByDeadlineDesc(user);
        return listTodos;
    }

    public void updateStatusTodo(Long id, String status) {
        todoRepository.updateStatus(status, id);
    }

    public Todo getTodoById(Long id) {
        Todo todo = todoRepository.findById(id).orElse(null);
        return todo;
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
