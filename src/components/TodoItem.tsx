import { Button, List, Checkbox, Space, Typography, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { deleteTodo, toogleStatus } from '../redux/todosOperations';
import { ITodo, Status } from '../types';
import { getTodosState } from '../redux/selectors';
import { useState } from 'react';

interface TodoItemProps {
    todo: ITodo
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const { id, title, completed } = todo;
    
    const { status } = useAppSelector(getTodosState);
    const dispatch = useAppDispatch();

    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const onRemoveTodo = () => {
        dispatch(deleteTodo(id));
        setSelectedId(id);
    }

    const todoIsDeleting = status === Status.LOADING && selectedId === id;
    return (
        <List.Item 
            data-testid={`todo-item-${todo.id}`}
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
            <Space size='large'>
                <Checkbox
                    name='completed'
                    onChange={() => dispatch(toogleStatus(id))}
                    checked={completed}
                />
                <Typography.Text>
                    {title}
                </Typography.Text>
            </Space>
            <Button
                style={{width: 150}}
                danger
                onClick={onRemoveTodo}
            >
                {todoIsDeleting && <Spin style={{marginRight: 10}} size='small'/>}
                Remove todo
            </Button>
        </List.Item>
    )
}

export default TodoItem;