import { createAction, props } from '@ngrx/store';
import { Project } from '../models/app.state';

export const loadProjects = createAction('[Project] Load Projects', props<{ projects: Project[] }>());
export const addProject = createAction('[Project] Add Project', props<{ project: Project }>());
export const updateProject = createAction('[Project] Update Project', props<{ project: Project }>());
export const deleteProject = createAction('[Project] Delete Project', props<{ id: number }>());
