import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/app.state';
import { login, logout } from '../actions/auth.actions';

export const initialAuthState: AuthState = {
  isAuthenticated: false
};

const _authReducer = createReducer(
  initialAuthState,
  on(login, state => ({ ...state, isAuthenticated: true })),
  on(logout, state => ({ ...state, isAuthenticated: false }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
