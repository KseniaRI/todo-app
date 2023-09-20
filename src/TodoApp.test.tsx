import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import MatchMediaMock from 'jest-matchmedia-mock';
import { ITodo } from "./types";
import TodoList from "./components/TodoList";
import { addTodo, removeTodo } from "./redux/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

interface ITodos {
    todos: ITodo[]
}

interface IState {
    todos: ITodos
}

const mockStore = configureStore<IState, any>();

const initialState: IState = {
    todos: {
        todos: [
            { id: '1', todoText: 'Todo 1', completed: false },
            { id: '2', todoText: 'Todo 2', completed: true },
            { id: '3', todoText: 'Todo 3', completed: true },
            { id: '4', todoText: 'Todo 4', completed: true }
        ]
    }
}

let matchMedia: MatchMediaMock;

describe('Todo App', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
 
    afterEach(() => {
      matchMedia.clear();
    });

    const store: MockStoreEnhanced<IState, any> = mockStore(initialState);
    const { todos } = store.getState().todos;

    it('call addTodo action with input value on Add button click', async() => {
        render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );
        const input = screen.getByTestId('todo-input');
        const addButton = screen.getByTestId('add-button');
        userEvent.type(input, 'new todo');
        userEvent.click(addButton);
        
        await waitFor(() => {
            expect(store.getActions()).toContainEqual(addTodo('new todo'))
        })
    })

    it('TodoList renders', () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        todos.forEach(todo => expect(screen.getByText(todo.todoText)).toBeInTheDocument());
    })

    it('displays all todos when "All" is selected', async() => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        const allButton = screen.getByText('All');
        userEvent.click(allButton);
        await waitFor(() => {
            expect(screen.getAllByTestId(/^todo-item-/)).toHaveLength(todos.length);
        })
    })

    it('displays completed todos when "Completed" is selected', async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        const completedTodos = todos.filter(todo => todo.completed);
        const completedButton = screen.getByText('Completed');

        userEvent.click(completedButton);

        await waitFor(() => {
            const completedTodoElements = screen.getAllByTestId(/^todo-item-/);
            expect(completedTodoElements).toHaveLength(completedTodos.length);
        })
    })

    it('displays active todos when "Active" is selected', async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        const activeTodos = todos.filter(todo => !todo.completed);
        const activeButton = screen.getByText('Active');
        userEvent.click(activeButton);
         
        await waitFor(() => {
            const activeTodoElements = screen.getAllByTestId(/^todo-item-/);
            expect(activeTodoElements).toHaveLength(activeTodos.length);
        })
    })

    it('call removeTodo action for each completed todo when "Clear completed" is selected', async() => { 
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
       
        const clearButton = screen.getByText('Clear completed');
        userEvent.click(clearButton);
        
        await waitFor(() => {
            todos
                .filter(todo => todo.completed)
                .forEach(completedTodo => expect(store.getActions()).toContainEqual(removeTodo(completedTodo.id)));
        })
    })

    it('call removeTodo action on "Remove todo" click', async () => {
        render(
            <Provider store={store}>
                <TodoItem todo={todos[0]} />
            </Provider>
        );
       
        const removeButton = screen.getByText('Remove todo');
        userEvent.click(removeButton);

        await waitFor(() => {
            expect(store.getActions()).toContainEqual(removeTodo(todos[0].id));
        })
    })

    it('count active todos left', async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        const activeTodos = todos.filter(todo => !todo.completed);
        const counter = screen.getByText(/todos left/);
        
        await waitFor(() => {
            expect(counter).toHaveTextContent(`${activeTodos.length} todos left`);
        })
    })
})