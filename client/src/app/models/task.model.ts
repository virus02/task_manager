export interface Task {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO string
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}