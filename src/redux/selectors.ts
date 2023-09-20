import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const getTodos = (state: RootState) => state.todos.todos;

export const getCompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => todo.completed === true)
);

export const getUncompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => todo.completed === false)
);

    
