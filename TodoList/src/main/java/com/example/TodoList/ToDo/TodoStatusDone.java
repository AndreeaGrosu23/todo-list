package com.example.TodoList.ToDo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoStatusDone {
    private String status;
    private int duration;
    private String deadline;
}
