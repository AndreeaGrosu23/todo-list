package com.example.TodoList.User;

import com.example.TodoList.ToDo.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotEmpty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    private String username;

//    @OneToMany(mappedBy = "user", cascade=CascadeType.ALL, orphanRemoval = true)
//    private List<Todo> todoList = new ArrayList<>();

    public User(@NotEmpty String username) {
        this.username = username;
    }
}
