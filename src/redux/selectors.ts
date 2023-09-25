import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const getTodos = (state: RootState) => state.tasks.todos;
export const getTodosState = (state: RootState) => state.tasks;

export const getCompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => todo.completed)
);

export const getUncompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => !todo.completed)
);

    
