import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, Status } from "../types";
import { addNewTodo, deleteTodo, fetchTodos, toogleStatus } from "./todosOperations";

interface TodoState{
    todos: ITodo[];
    status: undefined | Status;
    error: undefined | string;
}

const initialState: TodoState = {
    todos: [],
    status: undefined,
    error: undefined
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos.unshift(action.payload)
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state: TodoState) => {
                state.status = Status.LOADING;
                state.error = undefined;
            })
            .addCase(fetchTodos.fulfilled, (state: TodoState, action: PayloadAction<ITodo[]>) => {
                state.status = Status.RESOLVED;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state: TodoState, action) => {
                state.status = Status.REJECTED;
                state.error = action.payload || 'An error occurred';
            })

            .addCase(deleteTodo.pending, (state: TodoState) => {
                state.status = Status.LOADING;
                state.error = undefined;
            })
            .addCase(deleteTodo.fulfilled, (state: TodoState) => {
                state.status = Status.RESOLVED;
            })
            .addCase(deleteTodo.rejected, (state: TodoState, action) => {
                state.status = Status.REJECTED;
                state.error = action.payload || 'An error occurred while removing todo';
            })

            .addCase(toogleStatus.pending, (state: TodoState) => {
                state.status = Status.LOADING;
                state.error = undefined;
            })
            .addCase(toogleStatus.fulfilled, (state: TodoState) => {
                state.status = Status.RESOLVED;
            })
            .addCase(toogleStatus.rejected, (state: TodoState, action) => {
                state.status = Status.REJECTED;
                state.error = action.payload || 'An error occured while trying to change the status';
            })

            .addCase(addNewTodo.pending, (state: TodoState) => {
                state.status = Status.LOADING;
                state.error = undefined;
            })
            .addCase(addNewTodo.fulfilled, (state: TodoState) => {
                state.status = Status.RESOLVED;
            })
            .addCase(addNewTodo.rejected, (state: TodoState, action) => {
                state.status = Status.REJECTED;
                state.error = action.payload || 'An error occured while trying to add new todo';
            })
    }
})

export const { addTodo, removeTodo, toogleCompleted } = todoSlice.actions;
export default todoSlice.reducer;