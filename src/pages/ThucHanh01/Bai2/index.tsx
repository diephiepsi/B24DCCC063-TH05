import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Bai2: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrEdit = () => {
    if (!inputValue.trim()) return;

    if (editingId !== null) {
      setTodos(todos.map(t => t.id === editingId ? { ...t, text: inputValue } : t));
      setEditingId(null);
    } else {
      const newTodo = { id: Date.now(), text: inputValue, completed: false };
      setTodos([...todos, newTodo]);
    }
    setInputValue('');
  };

  const deleteTodo = (id: number) => setTodos(todos.filter(t => t.id !== id));

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <Card title="Quản lý công việc (TodoList)">
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập công việc cần làm..."
          onPressEnter={handleAddOrEdit}
        />
        <Button type="primary" onClick={handleAddOrEdit}>
          {editingId !== null ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>

      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => { setEditingId(item.id); setInputValue(item.text); }} />,
              <Button danger icon={<DeleteOutlined />} onClick={() => deleteTodo(item.id)} />,
            ]}
          >
            <Checkbox checked={item.completed} onChange={() => toggleTodo(item.id)}>
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Bai2;