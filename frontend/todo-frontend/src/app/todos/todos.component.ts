import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  loading = false;
  error = '';

  // Form fields
  newTodo: Todo = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    completed: false
  };

  editingTodo: Todo | null = null;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  /**
   * Load all todos from backend
   */
  loadTodos(): void {
    this.loading = true;
    this.error = '';
    
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos. Please check if the backend is running.';
        this.loading = false;
        console.error('Error loading todos:', err);
      }
    });
  }

  /**
   * Apply filter to todos
   */
  applyFilter(): void {
    switch (this.filter) {
      case 'active':
        this.filteredTodos = this.todos.filter(t => !t.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(t => t.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  /**
   * Change filter
   */
  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
    this.applyFilter();
  }

  /**
   * Create a new todo
   */
  createTodo(): void {
    if (!this.newTodo.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.todoService.createTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.applyFilter();
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to create todo';
        this.loading = false;
        console.error('Error creating todo:', err);
      }
    });
  }

  /**
   * Start editing a todo
   */
  startEdit(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  /**
   * Cancel editing
   */
  cancelEdit(): void {
    this.editingTodo = null;
  }

  /**
   * Save edited todo
   */
  saveEdit(): void {
    if (!this.editingTodo || !this.editingTodo.id) return;

    if (!this.editingTodo.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.todoService.updateTodo(this.editingTodo.id, this.editingTodo).subscribe({
      next: (updated) => {
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          this.todos[index] = updated;
          this.applyFilter();
        }
        this.editingTodo = null;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to update todo';
        this.loading = false;
        console.error('Error updating todo:', err);
      }
    });
  }

  /**
   * Toggle todo completion
   */
  toggleComplete(todo: Todo): void {
    if (!todo.id) return;

    this.todoService.toggleTodoCompletion(todo.id).subscribe({
      next: (updated) => {
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          this.todos[index] = updated;
          this.applyFilter();
        }
      },
      error: (err) => {
        this.error = 'Failed to toggle todo';
        console.error('Error toggling todo:', err);
      }
    });
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: number): void {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    this.loading = true;
    this.error = '';

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to delete todo';
        this.loading = false;
        console.error('Error deleting todo:', err);
      }
    });
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.newTodo = {
      title: '',
      description: '',
      priority: 'MEDIUM',
      completed: false
    };
  }

  /**
   * Get priority badge class
   */
  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  /**
   * Get stats
   */
  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get activeTodos(): number {
    return this.todos.filter(t => !t.completed).length;
  }
}
