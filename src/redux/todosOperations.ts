import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo, removeTodo, toogleCompleted } from "./todoSlice";
import { RootState } from "./store";
import { ITodo } from "../types";

export const fetchTodos = createAsyncThunk<ITodo[], void, { rejectValue: string }>(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }  
    }
)

export const deleteTodo = createAsyncThunk<void, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Can't delete todo. Server Error");
            }
            dispatch(removeTodo(id))
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const toogleStatus = createAsyncThunk<void, string, { rejectValue: string }>(
    'todos/toogleStatus',
    async (id, { rejectWithValue, dispatch, getState }) => {
        const state = getState() as RootState;
        const todo = state.tasks.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({completed: !todo?.completed})
                }) 
            if (!response.ok) {
                throw new Error("Can't change status. Server error");
            }
            dispatch(toogleCompleted(id));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const addNewTodo = createAsyncThunk<void, string, { rejectValue: string }>(
    'todos/addNewTodo',
    async (title, { rejectWithValue, dispatch }) => {
        try {
            const todo = {
                userId: 1,
                title,
                completed: false
            };
            
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            
            if (!response.ok) {
                throw new Error("Can't add new todo. Server error.");
            }

            const data = await response.json();
            dispatch(addTodo(data));
        } catch (error: any) {
            rejectWithValue(error.message);
        }      
    }
)