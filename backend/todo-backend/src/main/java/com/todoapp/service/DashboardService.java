package com.todoapp.service;

import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    @Autowired
    private TodoRepository todoRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTodos", todoRepository.count());
        stats.put("completedTodos", todoRepository.countByCompleted(true));
        stats.put("pendingTodos", todoRepository.countByCompleted(false));
        return stats;
    }
}
