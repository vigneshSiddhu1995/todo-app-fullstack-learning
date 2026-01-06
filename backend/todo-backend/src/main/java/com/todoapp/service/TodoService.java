package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    /**
     * Save a new todo to the database
     * @param todo The todo to save
     * @return The saved todo with generated ID
     * @throws RuntimeException if a todo with the same title already exists
     */
    public Todo saveTodo(Todo todo) {
        // Check for duplicate titles (case-insensitive)
        if (todoRepository.existsByTitleIgnoreCase(todo.getTitle())) {
            throw new RuntimeException("A todo with the title '" + todo.getTitle() + "' already exists");
        }
        
        return todoRepository.save(todo);
    }

    /**
     * Get all todos
     * @return List of all todos
     */
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    /**
     * Get a todo by ID
     * @param id The todo ID
     * @return Optional containing the todo if found
     */
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    /**
     * Update an existing todo
     * @param id The todo ID
     * @param updatedTodo The updated todo data
     * @return The updated todo
     * @throws RuntimeException if todo not found
     */
    public Todo updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(updatedTodo.getTitle());
                    todo.setDescription(updatedTodo.getDescription());
                    todo.setPriority(updatedTodo.getPriority());
                    todo.setCompleted(updatedTodo.isCompleted());
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    /**
     * Delete a todo by ID
     * @param id The todo ID to delete
     * @throws RuntimeException if todo not found
     */
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    /**
     * Toggle todo completion status
     * @param id The todo ID
     * @return The updated todo
     * @throws RuntimeException if todo not found
     */
    public Todo toggleTodoCompletion(Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.isCompleted());
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }
}