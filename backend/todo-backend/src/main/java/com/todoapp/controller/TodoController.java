package com.todoapp.controller;

import com.todoapp.model.Todo;
import com.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    @Autowired
    private TodoService todoService;

    /**
     * Create a new todo
     * @param todo The todo to create
     * @return ResponseEntity with the created todo or error message
     */
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody Todo todo) {
        try {
            // Basic validation
            if (todo.getTitle() == null || todo.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Title is required");
            }

            Todo savedTodo = todoService.saveTodo(todo);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Get all todos
     * @return List of all todos
     */
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    /**
     * Get a todo by ID
     * @param id The todo ID
     * @return ResponseEntity with the todo if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getTodoById(@PathVariable Long id) {
        Optional<Todo> todo = todoService.getTodoById(id);
        if (todo.isPresent()) {
            return ResponseEntity.ok(todo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update an existing todo
     * @param id The todo ID
     * @param todo The updated todo data
     * @return ResponseEntity with the updated todo or error message
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        try {
            // Basic validation
            if (todo.getTitle() == null || todo.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Title is required");
            }

            Todo updatedTodo = todoService.updateTodo(id, todo);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Delete a todo by ID
     * @param id The todo ID to delete
     * @return ResponseEntity with success or error message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok().body("Todo deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Toggle todo completion status
     * @param id The todo ID
     * @return ResponseEntity with the updated todo
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggleTodoCompletion(@PathVariable Long id) {
        try {
            Todo updatedTodo = todoService.toggleTodoCompletion(id);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}