package com.example.TodoList.ToDo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoStatusDone {
    private String status;
    private int duration;
    private String deadline;
}
