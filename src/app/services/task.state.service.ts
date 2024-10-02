import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/app.state';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {}

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task) {
    // const currentTasks = this.tasksSubject.value.map(task =>
    //   task.id === updatedTask.id ? updatedTask : task
    // );
    // this.tasksSubject.next(currentTasks);
  }

  deleteTask(id: number) {
    // const currentTasks = this.tasksSubject.value.filter(task => task.id !== id);
    // this.tasksSubject.next(currentTasks);
  }
}
