package com.example.TodoList.ToDo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoForm {
    private String taskType;
    private String name;
    private String deadline;
    private int duration;
}
