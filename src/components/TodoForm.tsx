import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { Button, Form, Input } from 'antd';
import { IValues } from '../types';

const TodoForm = () => {
  const [form] = Form.useForm();
  const value = Form.useWatch('todoText', form)?.trim();

  const dispatch = useDispatch();

  const onFinish = ({ todoText }: IValues) => {
    const trimmedTodo = todoText.trim();
      if (trimmedTodo.length) {
        dispatch(addTodo(trimmedTodo));
      }
    form.resetFields();
  };
    
  return (
    <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
    >
      <Form.Item
        label="Add todo"
        name="todoText"
        rules={[{ required: true, message: 'Write todo' }]}
      >
        <Input data-testid='todo-input'/>
      </Form.Item>
      <Form.Item>
        <Button
          data-testid='add-button'
          disabled={!value}
          type="primary"
          htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TodoForm;