import { Button, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { getCompletedTodos, getTodos, getUncompletedTodos } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { deleteTodo } from '../redux/todosOperations';
import { TododsIndicator } from '../types';

interface FooterTodoListProps{
    indicator: TododsIndicator;
    setIndicator: (indicator: TododsIndicator) => void
}

const FooterTodoList = ({ indicator, setIndicator }: FooterTodoListProps) => {
    const dispatch = useAppDispatch();

    const todos = useAppSelector(getTodos);
    const uncompletedTodos = useAppSelector(getUncompletedTodos);
    const completedTodos = useAppSelector(getCompletedTodos);

    useEffect(() => {
        if (uncompletedTodos.length === 0 || completedTodos.length === 0) {
            setIndicator(TododsIndicator.ALL);
        }
    }, [uncompletedTodos, completedTodos, setIndicator])
    
    const clearCompleted = () => {
        todos.forEach(todo => {
            if (todo.completed) {
                dispatch(deleteTodo(todo.id));
            }
        })
    }

    return (
        <Space style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography.Text strong>
                {uncompletedTodos.length} todos left
            </Typography.Text>
            <Space size='middle'>
                <Button
                    type={indicator === TododsIndicator.ALL ? 'primary' : 'dashed'}
                    onClick={() => setIndicator(TododsIndicator.ALL)}
                >
                    All
                </Button>
                <Button
                    type={indicator === TododsIndicator.UNCOMPLETED ? 'primary' : 'dashed'}
                    disabled={!uncompletedTodos.length}
                    onClick={() => setIndicator(TododsIndicator.UNCOMPLETED)}
                >
                    Active
                </Button>
                <Button
                    type={indicator === TododsIndicator.COMPLETED ? 'primary' : 'dashed'}
                    disabled={!completedTodos.length}
                    onClick={() => setIndicator(TododsIndicator.COMPLETED)}
                >
                    Completed
                </Button>
            </Space>
            <Button
                danger
                type='dashed'
                disabled={!completedTodos.length}
                onClick={() => clearCompleted()}
            >
                Clear completed
            </Button>
        </Space>
    )
}

export default FooterTodoList;