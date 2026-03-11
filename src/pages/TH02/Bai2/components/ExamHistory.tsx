import React from 'react';
import { Table, Button, Modal, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const ExamHistory = ({ exams }: any) => {
  const columns = [
    { title: 'Mã đề', dataIndex: 'id' },
    { title: 'Ngày tạo', dataIndex: 'createdAt' },
    { title: 'Số câu', render: (_: any, r: any) => <Tag color="blue">{r.questions.length}</Tag> },
    {
      title: 'Hành động',
      render: (_: any, r: any) => (
        <Button icon={<EyeOutlined />} onClick={() => Modal.info({
          title: 'Nội dung đề thi',
          content: r.questions.map((q: any, i: number) => <p key={i}>{i + 1}. {q.content}</p>)
        })}>Xem đề</Button>
      )
    }
  ];
  return <Table dataSource={exams} columns={columns} rowKey="id" />;
};
export default ExamHistory;