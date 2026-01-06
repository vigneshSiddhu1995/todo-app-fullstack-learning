import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  /**
   * Get all todos
   */
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  /**
   * Get a todo by ID
   */
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new todo
   */
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  /**
   * Update an existing todo
   */
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  /**
   * Toggle todo completion status
   */
  toggleTodoCompletion(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
