import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  projects: any[] = [];
  newProjectName: string = '';
  editProjectId: number | null = null;
  editProjectName: string = '';
  sortCriteria: string = 'priority';
  
  constructor(private projectService: ProjectService,private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() : void{
    this.projects = this.projectService.getProjects();
  }

  loadProjects() {
    this.projects = this.projectService.getProjects();
  }

  addProject() {
    if (this.newProjectName) {
      this.projectService.addProject(this.newProjectName);
      this.newProjectName = '';
      this.loadProjects();
    }
  }

  startEdit(project: any) {
    this.editProjectId = project.id;
    this.editProjectName = project.name;
  }

  updateProject() {
    if (this.editProjectId && this.editProjectName) {
      this.projectService.updateProject(this.editProjectId, this.editProjectName);
      this.editProjectId = null;
      this.editProjectName = '';
      this.loadProjects();
    }
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id);
    this.loadProjects();
  }
}
