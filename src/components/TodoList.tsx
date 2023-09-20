import { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Typography } from 'antd';
import TodoItem from './TodoItem';
import FooterTodoList from './FooterTodoList';
import { TododsIndicator } from '../types';
import { getCompletedTodos, getTodos, getUncompletedTodos } from '../redux/selectors';

const TodoList = () => {
    const todos = useSelector(getTodos);
    const completedTodos = useSelector(getCompletedTodos);
    const uncompletedTodos = useSelector(getUncompletedTodos);

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