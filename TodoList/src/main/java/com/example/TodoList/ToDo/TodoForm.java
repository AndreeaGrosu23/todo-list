package com.example.TodoList.ToDo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoForm {
    private String taskType;
    private String name;
    private String deadline;
    private int duration;
}
