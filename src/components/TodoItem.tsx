import { useDispatch } from 'react-redux';
import { removeTodo, toogleCompleted } from '../redux/todoSlice';
import { Button, List, Checkbox, Space, Typography } from 'antd';
import { ITodo } from '../types';

interface TodoItemProps {
    todo: ITodo
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const { id, todoText, completed } = todo;
    
    const dispatch = useDispatch();

    return (
        <List.Item 
            data-testid={`todo-item-${todo.id}`}
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
            <Space size='large'>
                <Checkbox
                    name='completed'
                    onChange={() => dispatch(toogleCompleted(id))}
                    checked={completed}
                />
                <Typography.Text>
                    {todoText}
                </Typography.Text>
            </Space>
            <Button
                danger
                onClick={() => dispatch(removeTodo(id))}
            >
                Remove todo
            </Button>
        </List.Item>
    )
}

export default TodoItem;