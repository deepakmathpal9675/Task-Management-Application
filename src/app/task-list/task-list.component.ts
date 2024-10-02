import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { MY_DATE_FORMATS } from '../app.module';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, NavbarComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers:[
    { provide: DateAdapter, useClass: NativeDateAdapter }, // Use NativeDateAdapter
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Set locale
  ]
})
export class TaskListComponent {
  @Input() project: any;
  sortCriteria: string = 'priority'; // Default sort criteria
  newTask: string = '';
  newPriority: any;
  newDeadline:any;
  editTaskIndex: number | null = null; // Track the index of the task being edited

  constructor(private taskService: TaskService,) {}

  addTask() {
    if (this.newTask.trim()) {
      if (this.editTaskIndex !== null) {
        // Update existing task
        this.project.tasks[this.editTaskIndex].name = this.newTask;
        this.editTaskIndex = null; // Reset after editing
      } else {
        // Create a new task
        const task = {
          id: this.project.tasks.length + 1,
          name: this.newTask,
          priority: Math.floor(Math.random() * 5) + 1, // Random priority for demo
          deadline: new Date(this.newDeadline).toISOString(), 
        };
        this.taskService.addTask(this.project.id, task);
      }
      // Clear input
      this.newTask = '';
      this.newPriority = '';
      this.newDeadline = null;

    }
  }

  editTask(index: number) {
    this.newTask = this.project.tasks[index].name; // Set input to the task's name
    //this.editTaskIndex = index; // Track which task is being edited
    const task = this.project.tasks[index];
    this.newPriority =this.project.tasks[index].priority;
    this.newDeadline = new Date(this.project.tasks[index].deadline); // Assuming task.deadline is a Date
    this.editTaskIndex = index; // Track which task is being edited
  }

  updateTask() {
    if (this.editTaskIndex !== null && this.newTask) {
      const taskId = this.project.tasks[this.editTaskIndex].id;
      const updatedTask = { id: taskId, name: this.newTask, deadline: new Date(this.newDeadline).toISOString(), 
        priority: this.newPriority
       };
      this.taskService.updateTask(this.project, taskId, updatedTask);
      this.newTask = ''; // Clear input
      this.editTaskIndex = null; // Reset the edit index
      this.newDeadline = null;
      this.newPriority = '';
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(this.project, taskId);
  }
  sortTasks(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const criteria = selectElement.value; // Get the value
    this.sortCriteria = criteria;
    this.project.tasks.sort((a: any, b: any) => {
      if (criteria === 'priority') {
        return a.priority - b.priority;
      } else if (criteria === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });
  }
}
