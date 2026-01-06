export interface Todo {
  id?: number;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
