package com.todoapp.repository;

import com.todoapp.model.Priority;
import com.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    long countByCompleted(Boolean completed);

    List<Todo> findByCompletedOrderByCreatedAtDesc(Boolean completed);

    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = false")
    long countPendingTodos();

    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = true")
    long countCompletedTodos();

    List<Todo> findByPriorityOrderByCreatedAtDesc(Priority priority);
}
