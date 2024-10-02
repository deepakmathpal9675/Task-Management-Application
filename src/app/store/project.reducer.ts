import { Action, createReducer, on } from '@ngrx/store';
import { ProjectState, Project } from '../models/app.state';
import { addProject, updateProject, deleteProject, loadProjects } from '../actions/project.actions';

export const initialState: ProjectState = {
  projects: []
};

const _projectReducer = createReducer(
  initialState,
  on(loadProjects, (state, { projects }) => ({ ...state, projects })),
  on(addProject, (state, { project }) => ({ ...state, projects: [...state.projects, project] })),
  on(updateProject, (state, { project }) => {
    const updatedProjects = state.projects.map(p => p.id === project.id ? project : p);
    return { ...state, projects: updatedProjects };
  }),
  on(deleteProject, (state, { id }) => ({
    ...state,
    projects: state.projects.filter(p => p.id !== id)
  }))
);

export function projectReducer(state: ProjectState | undefined, action: Action) {
  return _projectReducer(state, action);
}
