import React from 'react';
import { Form, Card, Space, InputNumber, Select, Button } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { levels, subjects } from '../utils';

const ExamGenerator = ({ onGenerate }: any) => (
  <Card title="Cấu trúc đề thi">
    <Form layout="vertical" onFinish={onGenerate}>
      <Form.Item name="subjectCode" label="Môn học" rules={[{ required: true }]}>
        <Select options={subjects} placeholder="Chọn môn học" />
      </Form.Item>
      <Space wrap>
        {levels.map(l => (
          <Form.Item key={l} name={l} label={`Số câu ${l}`} initialValue={0}>
            <InputNumber min={0} />
          </Form.Item>
        ))}
      </Space>
      <Button type="primary" htmlType="submit" block icon={<ThunderboltOutlined />} size="large">Tạo đề tự động</Button>
    </Form>
  </Card>
);
export default ExamGenerator;