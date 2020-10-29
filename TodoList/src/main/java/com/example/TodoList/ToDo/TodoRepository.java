package com.example.TodoList.ToDo;

import com.example.TodoList.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository("todo")
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUserOrderByCreatedAtDesc(User user);

    List<Todo> findAllByUserOrderByDeadlineAsc(User User);

    List<Todo> findAllByUserOrderByDeadlineDesc(User user);

    @Modifying(clearAutomatically = true)
    @Query(value="update Todo t set t.status = :status, t.deadline = :deadline, t.duration=:duration where t.id = :id")
    @Transactional
    void updateStatus(@Param("status") String status, @Param("deadline") LocalDate deadline, @Param("duration") int duration, @Param("id") Long id);

    Optional<Todo> findById(Long id);
}
