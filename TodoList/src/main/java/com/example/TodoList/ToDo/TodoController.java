package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import com.example.TodoList.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("api/v1/todo")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TodoController {

    private final UserService userService;
    private final TodoService todoService;

    @Autowired
    public TodoController(UserService userService, TodoService todoService) {
        this.userService = userService;
        this.todoService = todoService;
    }

    @PostMapping(path="/add-todo/{username}")
    public Todo addTodo(@PathVariable("username") String username, @RequestBody TodoForm todoForm ) {
        User user = userService.getUserByUsername(username).orElse(null);
        Todo newTodo = new Todo(todoForm.getTaskType(), todoForm.getName(), LocalDate.parse(todoForm.getDeadline()), todoForm.getDuration(), user);
        todoService.addTodo(newTodo);
        return newTodo;

    }

    @GetMapping(path="/{username}")
    public List<Todo> getAllTodos(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username).orElse(null);
        if (user!=null) {
            List<Todo> listTodos = todoService.getAllTodosByUser(user);
            return listTodos;
        }
        return null;
    }

    @GetMapping(path="/{username}/sorted-asc")
    public List<Todo> getAllTodosDeadlineAsc(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username).orElse(null);
        if (user!=null) {
            List<Todo> listTodos = todoService.getAllTodosByUserDeadlineAsc(user);
            return listTodos;
        }
        return null;
    }

    @GetMapping(path="/{username}/sorted-desc")
    public List<Todo> getAllTodosDeadlineDesc(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username).orElse(null);
        if (user!=null) {
            List<Todo> listTodos = todoService.getAllTodosByUserDeadlineDesc(user);
            return listTodos;
        }
        return null;
    }

    @PostMapping(path="/{id}/status-change")
    public Todo updateStatus(@PathVariable("id") Long id, @RequestBody String status) {
        todoService.updateStatusTodo(id, status);
        Todo todo = todoService.getTodoById(id);
        return todo;

    }

    @DeleteMapping(path="/{id}/delete-todo")
    public void deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteTodo(id);
    }
}
