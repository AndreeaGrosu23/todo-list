package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate createdAt;
    private String taskType;
    private String name;
    private LocalDate deadline;
    private int duration;
    private String status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public Todo(String taskType, String name, LocalDate deadline, int duration, User user) {
        this.taskType = taskType;
        this.name = name;
        this.deadline = deadline;
        this.duration = duration;
        this.user = user;
        this.status = "To do";
        this.createdAt = LocalDate.now();
    }
}
