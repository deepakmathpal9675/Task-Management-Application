import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Project } from '../models/app.state';
import { loadProjects, addProject, updateProject, deleteProject } from '../actions/project.actions';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects = [
    { id: 1, name: 'Beautifull Uttrakhand Project', tasks: [] },
    { id: 2, name: 'Bgmi', tasks: [] }
  ];

  constructor() { }
  
  getProjects() {
    return this.projects;
  }

  getProjectById(id: number) {
    return this.projects.find(project => project.id === id);
  }

  addProject(name: string) {
    this.projects.push({ id: this.projects.length + 1, name, tasks: [] });
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
  }
  updateProject(id: number, updatedName: string) {
    const projectIndex = this.projects.findIndex(project => project.id === id);
    if (projectIndex > -1) {
      this.projects[projectIndex].name = updatedName;
    }
  }
}