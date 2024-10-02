import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
export interface Task {
  id: number;
  name: string;
  priority: number;
  deadline: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  private projectsSubject: BehaviorSubject<Project[]>;
  private localStorageKey = 'projects';

  private defaultProjects: Project[] = [
    { id: 1, name: 'Beautifull Uttrakhand Project', tasks: [] },
    { id: 2, name: 'Bgmi', tasks: [] },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const savedProjects = this.loadProjectsFromLocalStorage();
    this.projectsSubject = new BehaviorSubject<Project[]>(savedProjects);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token'); // Replace with your actual key
      console.log(token);
    }
  }
  private loadProjectsFromLocalStorage(): Project[] {
    const storedProjects = localStorage.getItem(this.localStorageKey);
    if (storedProjects) {
      try {
        return JSON.parse(storedProjects);
      } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
      }
    }
    return this.defaultProjects;
  }

  private saveProjectsToLocalStorage(projects: Project[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(projects));
  }

  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.value.find((project) => project.id === id);
  }

  addTask(projectId: number, task: Task) {
    const currentProjects = this.projectsSubject.value;
    const updatedProjects = currentProjects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: [...project.tasks, task],
        };
      }
      return project;
    });

    this.projectsSubject.next(updatedProjects);
    this.saveProjectsToLocalStorage(updatedProjects);
  }

  updateTask(project: Project, taskId: number, updatedTask: Task) {
    const currentProjects = this.projectsSubject.value;
    const updatedProjects = currentProjects.map((p) => {
      if (p.id === project.id) {
        return {
          ...p,
          tasks: p.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        };
      }
      return p;
    });

    this.projectsSubject.next(updatedProjects);
    this.saveProjectsToLocalStorage(updatedProjects);
  }

  deleteTask(project: Project, taskId: number) {
    const currentProjects = this.projectsSubject.value;
    const updatedProjects = currentProjects.map((p) => {
      if (p.id === project.id) {
        return {
          ...p,
          tasks: p.tasks.filter((t) => t.id !== taskId),
        };
      }
      return p;
    });

    this.projectsSubject.next(updatedProjects);
    this.saveProjectsToLocalStorage(updatedProjects);
  }
}
