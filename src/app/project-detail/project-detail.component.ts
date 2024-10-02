import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { TaskService } from '../services/task.service';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,TaskListComponent,MatCardModule,MatGridTile,MatGridList],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit{
  project: any;
  newTask: string = '';
  sortCriteria: string = 'priority'; // Default sort criteria
  editTaskIndex: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.taskService.getProjects().subscribe(projects => {
      this.project = projects.find(p => p.id === +projectId);
    });
  }
  
  editTask(index: number) {
    this.newTask = this.project.tasks[index].name; // Set input to the task's name
    this.editTaskIndex = index; // Track which task is being edited
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(this.project, taskId);
  }

}
