import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];
  loading = false;
  
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  debouncedSearchTerm: string = '';

  selectedPriority: string = '';
  priorities: string[] = ['High', 'Medium', 'Low'];
  selectedStatus: 'all' | 'true' | 'false' = 'all';
  statuses: boolean[] = [true, false];

  sortBy: 'dueDate' | 'priority' | 'createdAt' | '' = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchSubject.next('');
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading tasks: ', error);
        this.loading = false;
      }
    });
  }

  deleteTask(id: string | undefined): void {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error deleting task: ', error);
      }
    });
  }

  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  get filteredTasks(): Task[] {
    const searchText = this.debouncedSearchTerm || this.searchTerm || '';
    let result = this.tasks.filter(task => {
      const matchesTitle = searchText
        ? task.title
          .toLowerCase()
          .includes(searchText.toLowerCase())
        : true;

      const matchesPriority = this.selectedPriority
        ? task.priority?.toLocaleLowerCase() === this.selectedPriority.toLocaleLowerCase()
        : true;

      const matchesStatus = this.selectedStatus !== 'all'
        ? task.completed === (this.selectedStatus === 'true')
        : true;

      return matchesTitle && matchesPriority && matchesStatus;
   });

   if(this.sortBy) {
    result = result.sort((a, b) => {
      let aValue = a[this.sortBy as keyof Task];
      let bValue = b[this.sortBy as keyof Task];

      if (this.sortBy === 'priority') {
        const priorityMap = { 'high': 3, 'medium': 2, 'low': 1 };
        aValue = a.priority ? (priorityMap[a.priority] || 0) as any : 0;
        bValue = b.priority ? (priorityMap[b.priority] || 0) as any : 0;
      }

      if (aValue === undefined) aValue = 0 as any;
      if (bValue === undefined) bValue = 0 as any;

      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
   }

   return result;
  }

  clearSort(): void {
    this.sortBy = '';
    this.sortOrder = 'asc';
  }
}
