import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodo } from "../types";

interface todoState{
    todos: ITodo[];
}

const initialState: todoState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: new Date().toISOString(),
                todoText: action.payload,
                completed: false
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toogleCompleted(state, action) {
            state.todos = state.todos.map(todo => {
                return todo.id !== action.payload ?
                    todo :
                    { ...todo, completed: !todo.completed }
            })
        }
    }
})

export const { addTodo, removeTodo, toogleCompleted } = todoSlice.actions;
export default todoSlice.reducer;