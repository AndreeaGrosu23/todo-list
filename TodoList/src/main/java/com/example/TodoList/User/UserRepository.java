package com.example.TodoList.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("user")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> getUserByUsername(String username);

}
