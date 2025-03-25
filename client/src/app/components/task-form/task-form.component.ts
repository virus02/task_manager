import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  task: Task = {
    _id: '',
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
    completed: false
  }
  isEdit = false;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEdit = true;
      this.taskService.getTasks().subscribe(tasks => {
        const existingTask = tasks.find(task => task._id === taskId);
        if (existingTask) {
          this.task = { ...existingTask };
        }
      });
    }
  }

  saveTask(): void {
    if (this.isEdit && this.task._id) {
      this.taskService.updateTask(this.task._id, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.addTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
