import { useState } from 'react';
import { List, Typography } from 'antd';
import { getCompletedTodos, getTodos, getUncompletedTodos } from '../redux/selectors';
import { useAppSelector } from '../redux/redux-hooks';
import TodoItem from './TodoItem';
import FooterTodoList from './FooterTodoList';
import { TododsIndicator } from '../types';

const TodoList = () => {
    const todos = useAppSelector(getTodos);
    const completedTodos = useAppSelector(getCompletedTodos);
    const uncompletedTodos = useAppSelector(getUncompletedTodos);

    const [indicator, setIndicator] = useState<TododsIndicator>(TododsIndicator.ALL); 

    const setTodosToDesplay = () => {
        switch (indicator) {
            case TododsIndicator.ALL:
                return todos;
            case TododsIndicator.COMPLETED:
                return completedTodos;
            case TododsIndicator.UNCOMPLETED:
                return uncompletedTodos;
            default:
                return todos;
        }
    }

    const displayedTodos = setTodosToDesplay();

    return (
        <List
            header={<Typography.Title level={2}>Todos</Typography.Title>}
            footer={todos.length ?
                <FooterTodoList
                    indicator={indicator}
                    setIndicator={setIndicator}
                />
                : null
            }
            bordered
            dataSource={displayedTodos}
            renderItem={(todo) => (
                <TodoItem todo={todo}/>
            )}
        />
    )
}

export default TodoList;