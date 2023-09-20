import { useSelector, useDispatch } from 'react-redux';
import { Button, Space, Typography } from 'antd';
import { removeTodo } from '../redux/todoSlice';
import { TododsIndicator } from '../types';
import { getCompletedTodos, getTodos, getUncompletedTodos } from '../redux/selectors';

interface FooterTodoListProps{
    indicator: TododsIndicator;
    setIndicator: (indicator: TododsIndicator) => void
}

const FooterTodoList = ({ indicator, setIndicator }: FooterTodoListProps) => {
    const dispatch = useDispatch();

    const todos = useSelector(getTodos);
    const uncompletedTodos = useSelector(getUncompletedTodos);
    const completedTodos = useSelector(getCompletedTodos);

    const clearCompleted = () => {
        todos.forEach(todo => {
            if (todo.completed === true) {
                dispatch(removeTodo(todo.id));
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