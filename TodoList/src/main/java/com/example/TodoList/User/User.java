package com.example.TodoList.User;

import com.example.TodoList.ToDo.TodoModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotEmpty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="USERS")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    private String username;

    @OneToMany(mappedBy = "userModel", cascade=CascadeType.ALL, orphanRemoval = true)
    private List<TodoModel> todoList = new ArrayList<>();
}
