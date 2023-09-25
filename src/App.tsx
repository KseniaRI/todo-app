import { useEffect } from 'react';
import { fetchTodos } from './redux/todosOperations';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import { Spin, Typography } from 'antd';
import { getTodos, getTodosState } from './redux/selectors';
import { Status } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getTodos)
  const { error, status } = useAppSelector(getTodosState);

  useEffect(() => {
    dispatch(fetchTodos());
    
  }, [dispatch])
  
  const todosIsFetching = (status === Status.LOADING) && !todos.length;

  return (
    <div className="App">
      <TodoForm />
      {todosIsFetching && <Spin size='large' />}
      {error && <Typography.Text type='warning'>Something went wrong: {error}</Typography.Text>}
      <TodoList/>
    </div>
  );
}

export default App;
