export interface AppState {
    projects: ProjectState;
    tasks: TaskState;
    auth: AuthState;
  }
  
  export interface ProjectState {
    projects: Project[];
  }
  
  export interface TaskState {
    tasks: Task[];
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
  }
  
  export interface Project {
    id: number;
    name: string;
    tasks: Task[];
  }
  
  export interface Task {
    id: number;
    name: string;
    priority: number;
    deadline: string;
  }
  